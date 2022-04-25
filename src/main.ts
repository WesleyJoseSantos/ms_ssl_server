import { AppModule } from "./app.module";

async function bootstrap() {
    const appModule = new AppModule()

    try {
        await appModule.initServer()
        console.log('SERVER STARTED')
    } catch (err) {
        console.error('SERVER START ERR', err)
    }

    try {
        await appModule.initOpenSsl()
        console.log('OPENSSL STARTED')
    } catch (err) {
        console.error('OPENSSL START ERR', err)
    }
}   

bootstrap()