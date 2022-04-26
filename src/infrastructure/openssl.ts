import { SslRequestDTO } from '../business/dtos/ssl_request_dto';
import { SslResultDTO } from '../business/dtos/ssl_result_dto';
import { spawn } from 'child_process';
import { existsSync, mkdirSync, readFileSync, rmdir, rmdirSync, rmSync } from 'fs';

export class OpenSsl {
    private static _caCrtPath? : string
    private static _caKeyPath? : string
    private static _ca? : SslRequestDTO

    public static sslDir? : string

    public static async init(sslDir: string, ca: SslRequestDTO){
        this.sslDir = sslDir
        this._ca = ca
        this._caCrtPath = this.sslDir + this._ca.name + '.crt'
        this._caKeyPath = this.sslDir + this._ca.name + '.key'
        
        rmSync(this.sslDir!, { recursive: true })
        mkdirSync(this.sslDir!)

        await this._createCa(this._ca)
        await this._signCa(this._ca)
    }

    public static async processReq(req: SslRequestDTO): Promise<SslResultDTO> {
        if(!this.exists(req)){
            await this._createKey(req)
            await this._createCsr(req)
            await this._sign(req)
            return this.getFiles(req)
        }else{
            const crtFile = this.sslDir + req.name + '.crt'
            const daysLeft = await this.daysRemaining(crtFile);
            if(daysLeft <= 1){
                await this._createCsr(req)
                await this._sign(req)
            }
            return this.getFiles(req)
        }

    }

    public static exists(req: SslRequestDTO) : boolean {
        return existsSync(`${this.sslDir + req.name}.key`)
    }

    public static getFiles(req: SslRequestDTO) : SslResultDTO {
        const keyFile = this.sslDir + req.name + '.key'
        const crtFile = this.sslDir + req.name + '.crt'
        const caFile = this._caCrtPath ?? ''
        
        return {
            ca : existsSync(caFile) ? readFileSync(caFile).toString() : '',
            key : existsSync(keyFile) ? readFileSync(keyFile).toString() : '',
            crt : existsSync(crtFile) ? readFileSync(crtFile).toString() : '',
        }
    }

    public static async daysRemaining(crtPath: string): Promise<number> {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const today = new Date()
        var days : number

        return new Promise((resolve, reject) => {
            if(!existsSync(crtPath)){
                resolve(0)
            }else{
                const ls = spawn('openssl', ['x509', '-noout', '-enddate', '-in', `${crtPath}`])
    
                ls.stdout.on('data', (data) => {
                    try {
                        var ssldate = data.toString().replace(/ +(?= )/g, '').split('=')[1]
                        var arrdate = ssldate.split(' ')
                        var month = ((months.indexOf(arrdate[0]) + 1).toString())
                        var day = arrdate[1]
                        if(month.length < 2) month = '0' + month
                        if(day.length < 2) day = '0' + day
                        var strdate = arrdate[3] + '-' + month + '-' + day + 'T' + arrdate[2] + '.000Z'
                        var diff = (new Date(strdate).getTime() - today.getTime()) / 86400000
                        days = Math.floor(diff)
                    } catch (error) {
                        console.log(data)
                        console.error(error)
                        return this.daysRemaining(crtPath)
                    }
                });
    
                ls.stderr.on('data', (data) => {
                    console.error(data.toString())
                });
    
                ls.on('close', (_code) => {
                    resolve(days)
                });
            }
        });
    }

    private static async _createCa(req: SslRequestDTO): Promise<number | null> {
        return new Promise((resolve, reject) => {
            const ls = spawn('openssl', ['genrsa', '-des3', '-passout', `pass:${req.pass}`, '-out', `${this.sslDir}${req.name}.key`, '2048'])
            ls.on('close', (code) => {
                resolve(code)
            });
        })
    }

    private static async _createKey(req: SslRequestDTO): Promise<number | null> {
        return new Promise((resolve, reject) => {
            const ls = spawn('openssl', ['genrsa', '-out', `${this.sslDir}${req.name}.key`, '2048'])
            ls.on('close', (code) => {
                resolve(code)
            });
        })
    }

    private static async _createCsr(req: SslRequestDTO): Promise<number | null> {
        return new Promise((resolve, reject) => {
            const ls = spawn('openssl', ['req', '-new', '-out', `${this.sslDir}${req.name}.csr`, '-key', `${this.sslDir}${req.name}.key`, '-subj', `/C=${req.country}/ST=${req.state}/L=${req.locality}/O=${req.org}/OU=${req.unit}/CN=${req.cn}/emailAddress=${req.email}`])
            ls.on('close', (code) => {
                resolve(code)
            });
        })
    }

    private static async _signCa(req: SslRequestDTO): Promise<number | null> {
        return new Promise((resolve, reject) => {
            const ls = spawn('openssl', ['req', '-new', '-x509', '-days', `${req.days}`, '-passin', `pass:${req.pass}`, '-key', `${this.sslDir}${req.name}.key`, '-out', `${this.sslDir}${req.name}.crt`, '-subj', `/C=${req.country}/ST=${req.state}/L=${req.locality}/O=${req.org}/OU=${req.unit}/CN=${req.cn}/emailAddress=${req.email}`])
            ls.on('close', (code) => {
                resolve(code)
            });
        })
    }

    private static async _sign(req: SslRequestDTO): Promise<number | null> {
        const daysLeft = await this.daysRemaining(this._caCrtPath!);
        if(daysLeft <= 1){
            rmSync(this.sslDir!, { recursive: true })
            mkdirSync(this.sslDir!)
            await this._signCa(this._ca!)
        }
        return new Promise((resolve, reject) => {
            const ls = spawn('openssl', ['x509', '-req', '-in', `${this.sslDir}${req.name}.csr`, '-CA', `${this._caCrtPath}`, '-CAkey', `${this._caKeyPath}`, '-CAcreateserial', '-out', `${this.sslDir}${req.name}.crt`, '-days', `${req.days}`, '-passin', `pass:${req.pass}`])
            ls.on('close', (code) => {
                resolve(code)
            });
        })
    }
}