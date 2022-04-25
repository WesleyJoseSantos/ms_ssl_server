import { SslRequestDTO } from '@business/dtos/ssl_request_dto'
import { Environment } from '@infrastructure/environments'
import { HttpServer } from "@infrastructure/http_server"
import { OpenSsl } from '@infrastructure/openssl'
import { routes } from "./router"

/**
 * @module CompositionRoot
 * App Module Composition Root
 */
export class AppModule {

    constructor() {
        Environment.register()
    }
    
    public async initServer() {
        const httpServer = new HttpServer()
        httpServer.init()
        httpServer.registerRoute(routes)
        httpServer.listening()
    }

    public async initOpenSsl() {
        const sslDir = process.env.SSL_DIR as string
        const ca = {
            name: process.env.SSL_CA_NAME,
            pass: process.env.SSL_CA_PASS,
            days: process.env.SSL_CA_DAYS,
            country: process.env.SSL_CA_COUNTRY,
            state: process.env.SSL_CA_STATE,
            locality: process.env.SSL_CA_LOCALITY,
            org: process.env.SSL_CA_ORG,
            unit: process.env.SSL_CA_UNIT,
            cn: process.env.SSL_CA_CN,
            email: process.env.SSL_CA_EMAIL
        } as SslRequestDTO
        
        await OpenSsl.init(sslDir, ca)
    }
}