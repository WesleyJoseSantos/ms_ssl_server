import { OpenSsl } from '../../infrastructure/openssl';
import { ISslRepository } from '../../application/interfaces/issl_repository';
import { SslRequestDTO } from '../../business/dtos/ssl_request_dto';
import { SslResultDTO } from '../../business/dtos/ssl_result_dto';
import { BaseError } from '../../shared/base_error';
import { Either, left, right } from '../../shared/either';

export class SslRepository implements ISslRepository {

    public async requestCert(certRequest: SslRequestDTO) : Promise<Either<BaseError, SslResultDTO>>{
        try {
            var result = await OpenSsl.processReq(certRequest)
            return right(result)
        } catch (err) {
            return left(err as BaseError)
        }        
    }

}