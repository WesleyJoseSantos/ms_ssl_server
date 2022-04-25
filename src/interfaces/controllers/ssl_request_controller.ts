import { MediaTypeError } from '../../application/errors/mediatype_error';
import { NotFoundError } from '../../application/errors/notfound_error';
import { UnauthorizedError } from '../../application/errors/unauthorizederror';
import { WrongPasswordError } from '../../application/errors/worng_password_error';
import { ISslRequestUsecase } from '../../business/interfaces/issl_request_usecase';
import { HttpRequest, HttpResponse } from '../../infrastructure/http_server';
import { OpenSsl } from '../../infrastructure/openssl';
import { ControllerBase } from '../../shared/utils/controller_base';
import { existsSync, readFileSync } from 'fs';
import mime from 'mime'

export class SslRequestController extends ControllerBase {
    constructor(private readonly _sslRequestUsecase : ISslRequestUsecase){
        super()
    }

    public async post (req: HttpRequest) : Promise<HttpResponse> {
        const result = await this._sslRequestUsecase.processing(req.body);
        if(result.isLeft()){
            switch (result.value.constructor) {
                case UnauthorizedError:
                    return this.unauthorized({body: result.value.message})
                case MediaTypeError:
                    return this.unsupportedMediaType({body: result.value.message})
                case WrongPasswordError:
                    return this.forbidden({body: result.value.message})
                case NotFoundError:
                    return this.notFound({body: result.value.message})
                default:
                    return this.internalServerError({body: result.value.message})
            }
        }
        return this.created({body: result.value})
    }

    public async get (req: HttpRequest) : Promise<HttpResponse> {
        const name = req.params.name
        const path = OpenSsl.sslDir as string
        const filename = path + name
        const mimetype = mime.lookup(filename)

        if(!existsSync(path + name)){
            return this.notFound({ body: 'Requested file not founded.' })
        }else{
            return this.ok(
                { 
                    headers: {
                        'Content-disposition': 'attachment; filename=' + name,
                        'Content-type': mimetype,
                    },                    
                    body: readFileSync(filename).toString()
                })
        }
    }
}