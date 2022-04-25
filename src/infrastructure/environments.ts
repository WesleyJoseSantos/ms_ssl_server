const dotEnv = require('dotenv')

export class Environment {
    static register() {
        const nodeEnv = process.env.NODE_ENV || 'development'
        dotEnv.config({path: `.env.${nodeEnv}`})
    }
}