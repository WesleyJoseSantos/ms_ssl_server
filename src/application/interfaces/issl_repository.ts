import { SslRequestDTO } from "../../business/dtos/ssl_request_dto";
import { SslResultDTO } from "../../business/dtos/ssl_result_dto";
import { BaseError } from "../../shared/base_error";
import { Either } from "../../shared/either";

export interface ISslRepository {
    requestCert: (certRequest: SslRequestDTO) => Promise<Either<BaseError, SslResultDTO>>
}