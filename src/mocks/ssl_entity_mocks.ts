import { SslEntityDTO } from "@business/dtos/ssl_enitity_dto";
import { SslEntityContentDTO } from "@business/dtos/ssl_entity_content_dto";
import { ISslEntity } from "@application/interfaces/issl_entity";

export const sslEntitySpy : ISslEntity = {
    create: (): Promise<SslEntityContentDTO> => jest.fn as any,
    update: (content: SslEntityContentDTO): void => jest.fn as any,
    sign: (): Promise<SslEntityContentDTO> => jest.fn as any,
    daysRemaining: (): Promise<number> => jest.fn as any,
    expired: (): Promise<boolean> => jest.fn as any,
    exists: false,
    content: {ca:'', crt:'', key: '', newCa: ''},
    info: {days:'0', name: 'sslspy', pass:''}
}

export const caEntitySpy : ISslEntity = {
    create: (): Promise<SslEntityContentDTO> => jest.fn as any,
    update: (content: SslEntityContentDTO): void => jest.fn as any,
    sign: (): Promise<SslEntityContentDTO> => jest.fn as any,
    daysRemaining: (): Promise<number> => jest.fn as any,
    expired: (): Promise<boolean> => jest.fn as any,
    exists: false,
    content: {ca:'', crt:'', key: '', newCa: ''},
    info: {days:'0', name: 'caspy', pass:''}
}