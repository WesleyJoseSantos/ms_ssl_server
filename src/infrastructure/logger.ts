import pino, { P } from 'pino'

export class Logger {
  private static _instance: Logger
  public lg: P.Logger

  constructor () {
    this.lg = pino({
      enabled: process.env.ENABLE_LOG === 'true',
      level: process.env.LOG_LEVEL || 'warn'
    })
  }

  static getInstance (): Logger {
    if (!this._instance) {
      this._instance = new Logger()
    }
    return this._instance
  }
}
