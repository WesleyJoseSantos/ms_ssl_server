import { HttpRequest, HttpResponse } from "@infrastructure/http_server"
import { Logger } from "@infrastructure/logger"
import { Request, Response } from 'express'

export const RouteAdapt = (handler: (req: HttpRequest) => Promise<HttpResponse>, logger: Logger) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      body: req.body,
      params: req.params,
      auth: (req as any).auth,
      query: req.query
    }
    logger.lg.info({
      method: req.method,
      path: req.path,
      type: 'request',
      requestBody: req.body,
      requestHeader: req.headers
    })

    const resolve = await handler(httpRequest)

    if (resolve.statusCode >= 400) {
      logger.lg.error({
        method: req.method,
        path: req.path,
        type: 'response',
        statusCode: resolve.statusCode,
        responseBody: resolve.body,
        responseHeader: resolve.headers
      })
      return res.status(resolve.statusCode).header(resolve?.headers).json({ statusCode: resolve.statusCode, message: resolve.body })
    }

    logger.lg.info({
      method: req.method,
      path: req.path,
      type: 'response',
      statusCode: resolve.statusCode,
      responseBody: resolve.body,
      responseHeader: resolve.headers
    })
    return res.status(resolve.statusCode).header(resolve?.headers).json(resolve.body)
  }
}
