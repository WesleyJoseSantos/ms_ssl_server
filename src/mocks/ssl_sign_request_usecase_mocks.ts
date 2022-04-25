import { SslEntityDTO } from "@business/dtos/ssl_enitity_dto";
import { SslEntityContentDTO } from "@business/dtos/ssl_entity_content_dto";
import { ISslSignRequestUsecase } from "@business/interfaces/issl_sign_request_usecase";
import { BaseError } from "@shared/base_error";
import { Either } from "@shared/either";

export const SslSignRequestMock : SslEntityDTO = {
    name : 'mock',
    pass : 'hdrbroker',
    days : '360'
}

export const sslSignRequestUsecaseSpy : ISslSignRequestUsecase = {
    processing: (sslSignRequest : SslEntityDTO) : Promise<Either<BaseError,SslEntityContentDTO>> => jest.fn as any
}