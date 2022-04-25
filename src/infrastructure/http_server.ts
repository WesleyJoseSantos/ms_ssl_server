import {json} from 'body-parser'
import express, { Application, Router } from 'express'

export class HttpServer {
  private readonly _server: Application

  constructor () {
    this._server = express()
  }

  public init (): void {
    this._server.use(json() as any)
  }

  public registerRoute (route: Router) {
    this._server.use(route)
  }

  public listening (): void {
    const PORT = process.env.PORT || 4000
    this._server.listen(PORT, () => console.log(`Server running and listening on: 127.0.0.1:${PORT}`))
  }
}

export interface HttpResponse {
  statusCode: number;
  headers?: any;
  body?: any;
}

export interface HttpRequest<THeader = any, TBody = any, TParams = any, TAuth = any, TQuery = any> {
  headers: THeader;
  body: TBody;
  params?: TParams;
  auth?: TAuth;
  query?: TQuery;
}



