import { BaseError } from '../../shared/base_error';
import { Either } from '../../shared/either';
import { SslRequestDTO } from '../../business/dtos/ssl_request_dto';
import { SslResultDTO } from '../../business/dtos/ssl_result_dto';

export interface ISslRequestUsecase {
    processing: (request: SslRequestDTO) => Promise<Either<BaseError, SslResultDTO>>
}