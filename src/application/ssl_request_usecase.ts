import { SslResultDTO } from '../business/dtos/ssl_result_dto';
import { ISslRequestUsecase } from '../business/interfaces/issl_request_usecase';
import { SslRequestDTO } from '../business/dtos/ssl_request_dto';
import { BaseError } from '../shared/base_error';
import { ISslRepository } from '../application/interfaces/issl_repository';
import { MediaTypeError } from '../application/errors/mediatype_error';
import { UnauthorizedError } from './errors/unauthorizederror';
import { WrongPasswordError } from './errors/worng_password_error';
import { Either, left, right } from '../shared/either';

export class SslRequestUsecase implements ISslRequestUsecase {
    constructor(
        private readonly _sslRepository: ISslRepository
    ){}

    public async processing(request: SslRequestDTO): Promise<Either<BaseError, SslResultDTO>>{
        const validationResult = this._validateMessage(request)

        if (validationResult.isLeft()) {
            return left(validationResult.value)
        }

        return this._sslRepository.requestCert(request)
    }

    private _validateMessage(sslReq: SslRequestDTO): Either<BaseError, boolean> {
        const ca = process.env.SSL_CA_NAME as string

        sslReq.name = sslReq.name.split(':').join('')

        if(sslReq.name.toUpperCase() == ca.toUpperCase()
        ){
            return left(new UnauthorizedError('Error: Requested Entity is Protected'))
        }
        
        if (sslReq.name == null || sslReq.name == '' || !/^[A-Za-z0-9]*$/.test(sslReq.name)) {
            return left(new MediaTypeError('Error: Invalid Entity Name'))
        }

        if (sslReq.pass != process.env.SSL_CA_PASS) {
            return left(new WrongPasswordError('Error: Invalid CA Pass'))
        }

        if (sslReq.days == null || isNaN(Number(sslReq.days))) {
            return left(new MediaTypeError('Error: Invalid Days'))
        }

        if (sslReq.country == null || sslReq.country == '') {
            return left(new MediaTypeError('Error: Invalid Entity Country'))
        }

        if (sslReq.state == null || sslReq.state == '') {
            return left(new MediaTypeError('Error: Invalid Entity State'))
        }

        if (sslReq.locality == null || sslReq.locality == '') {
            return left(new MediaTypeError('Error: Invalid Entity Locality'))
        }

        if (sslReq.org == null || sslReq.org == '') {
            return left(new MediaTypeError('Error: Invalid Entity Organization'))
        }

        if (sslReq.unit == null || sslReq.unit == '') {
            return left(new MediaTypeError('Error: Invalid Entity Unit'))
        }

        if (sslReq.cn == null || sslReq.cn == '') {
            return left(new MediaTypeError('Error: Invalid Entity Common Name (CN)'))
        }

        if (sslReq.email == null || sslReq.email == '') {
            return left(new MediaTypeError('Error: Invalid Entity e-mail'))
        }

        return right(true)
    }
}