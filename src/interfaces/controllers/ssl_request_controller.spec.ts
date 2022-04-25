import { SslCreateRequestMock, sslCreateRequestUsecaseSpy } from '../mocks/ssl_create_request_usecase_mocks'
import { left, right } from '../shared/either'
import { SslCreateRequestController } from './ssl_create_request_controller'
import { HttpRequest } from '../infrastructure/http_server'
import { sslSignRequestResultDTO } from '../mocks/ssl_mocks';
import { UnauthorizedError } from '../application/errors/unauthorizederror';
import { MediaTypeError } from '../application/errors/mediatype_error';
import { NotFoundError } from '../application/errors/notfound_error';
import { WrongPasswordError } from '../application/errors/worng_password_error';
import { InternalError } from '../application/errors/internal_error';

function makeSut() {
    const sut = new SslCreateRequestController(sslCreateRequestUsecaseSpy)

    const httpRequest: HttpRequest = {
        headers: {},
        body: SslCreateRequestMock,
        params: { id: 1 }
      }

    return { sut , httpRequest }
}

describe('SslCreateRequestController', ()  => {
    beforeEach(async () => {
        jest.clearAllMocks()
    })

    describe('GET', () => {

        it('get()', async () => {
            // arrange
            const { sut, httpRequest } = makeSut()
            jest.spyOn(sslCreateRequestUsecaseSpy, 'processing').mockResolvedValueOnce(right(sslSignRequestResultDTO))

            // act
            await sut.post(httpRequest)

            // assert
            expect(sslCreateRequestUsecaseSpy.processing).toHaveBeenCalledTimes(1)
            expect(sslCreateRequestUsecaseSpy.processing).toHaveBeenCalledWith(SslCreateRequestMock)
        })

        it('Should return HTTP Created (201) if sslCreateRequestUsecase returns Right', async () => {
            // arrange
            const { sut, httpRequest } = makeSut()
            jest.spyOn(sslCreateRequestUsecaseSpy, 'processing').mockResolvedValueOnce(right(sslSignRequestResultDTO))

            // act
            const result = await sut.post(httpRequest)

            // assert
            expect(result.statusCode).toEqual(201)
        })

        it('Should return HTTP Unauhorized (401) if sslCreateRequestUsecase returns Left UnauthorizedError', async () => {
            // arrange
            const { sut, httpRequest } = makeSut()
            jest.spyOn(sslCreateRequestUsecaseSpy, 'processing').mockResolvedValueOnce(left(new UnauthorizedError()))

            // act
            const result = await sut.post(httpRequest)

            // assert
            expect(result.statusCode).toEqual(401)
        })

        it('Should return HTTP Unsuported Media Type (415) if sslCreateRequestUsecase returns Left MediaTypeError', async () => {
            // arrange
            const { sut, httpRequest } = makeSut()
            jest.spyOn(sslCreateRequestUsecaseSpy, 'processing').mockResolvedValueOnce(left(new MediaTypeError()))

            // act
            const result = await sut.post(httpRequest)

            // assert
            expect(result.statusCode).toEqual(415)
        })

        it('Should return HTTP Forbidden (403) if sslCreateRequestUsecase returns Left WrongPasswordError', async () => {
            // arrange
            const { sut, httpRequest } = makeSut()
            jest.spyOn(sslCreateRequestUsecaseSpy, 'processing').mockResolvedValueOnce(left(new WrongPasswordError()))

            // act
            const result = await sut.post(httpRequest)

            // assert
            expect(result.statusCode).toEqual(403)
        })

        it('Should return HTTP Not Found (404) if sslCreateRequestUsecase returns Left NotFoundError', async () => {
            // arrange
            const { sut, httpRequest } = makeSut()
            jest.spyOn(sslCreateRequestUsecaseSpy, 'processing').mockResolvedValueOnce(left(new NotFoundError()))

            // act
            const result = await sut.post(httpRequest)

            // assert
            expect(result.statusCode).toEqual(404)
        })

        it('Should return HTTP Internal Server Error (500) if sslCreateRequestUsecase returns Left NotFoundError', async () => {
            // arrange
            const { sut, httpRequest } = makeSut()
            jest.spyOn(sslCreateRequestUsecaseSpy, 'processing').mockResolvedValueOnce(left(new InternalError()))

            // act
            const result = await sut.post(httpRequest)

            // assert
            expect(result.statusCode).toEqual(500)
        })
    })
})