import { SslEntityDTO } from "@business/dtos/ssl_enitity_dto";
import { SslEntityContentDTO } from "@business/dtos/ssl_entity_content_dto";
import { ISslCreateRequestUsecase } from "@business/interfaces/issl_create_request_usecase";
import { BaseError } from "@shared/base_error";
import { Either } from "@shared/either";

export const SslCreateRequestMock: SslEntityDTO = {
    name : 'mock',
    pass : 'hdrbroker',
    country : 'BR',
    state : 'Minas Gerais',
    locality : 'Divinópolis',
    org : 'Hedro',
    unit : 'Hedro Sistemas Inteligentes',
    cn : 'client.com',
    email : 'wesley@hedro.com.br',
    days : '360'
}

export const sslCreateRequestUsecaseSpy : ISslCreateRequestUsecase = {
    processing: (sslCreateRequest : SslEntityDTO) : Promise<Either<BaseError,SslEntityContentDTO>> => jest.fn as any
}