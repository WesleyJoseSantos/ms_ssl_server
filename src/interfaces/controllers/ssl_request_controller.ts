import { MediaTypeError } from '../../application/errors/mediatype_error';
import { NotFoundError } from '../../application/errors/notfound_error';
import { UnauthorizedError } from '../../application/errors/unauthorizederror';
import { WrongPasswordError } from '../../application/errors/worng_password_error';
import { ISslRequestUsecase } from '../../business/interfaces/issl_request_usecase';
import { HttpRequest, HttpResponse } from '../../infrastructure/http_server';
import { OpenSsl } from '../../infrastructure/openssl';
import { ControllerBase } from '../../shared/utils/controller_base';
import { existsSync } from 'fs';
import { Request, Response } from 'express';
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

    public async get (req: Request, res: Response) {
        const name = req.params.name
        const path = OpenSsl.sslDir as string
        const filename = path + name

        if(!existsSync(path + name)){
            res.status(404).json({ body: 'Requested file not founded.' })
        }else{
            res.status(200).download(filename)
        }
    }
}