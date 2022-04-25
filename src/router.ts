import { RouteAdapt } from '@infrastructure/express.router.adapt'
import { Logger } from '@infrastructure/logger'
import { Router } from 'express'
import { SignInController } from '@controllers/sign_in_controller'
import { SslRepository } from '@infrastructure/repositories/ssl_repository'
import { SslRequestUsecase } from '@application/ssl_request_usecase'
import { SslRequestController } from '@controllers/ssl_request_controller'
import { ProvControllerV1 } from '@controllers/prov_controller_v1'
import { ProvControllerV2 } from '@controllers/prov_controller_v2'

const routes = Router()

const logger = Logger.getInstance()

//simulated routes
const signInController = new SignInController()
routes.post('/v1/proteu/signin', RouteAdapt(signInController.post.bind(signInController), logger))

const provControllerV1 = new ProvControllerV1()
routes.post('/v1/collectorsProv', RouteAdapt(provControllerV1.post.bind(provControllerV1), logger))

const provControllerV2 = new ProvControllerV2()
routes.post('/v2/collectorsProv', RouteAdapt(provControllerV2.post.bind(provControllerV2), logger))

const sslRepository = new SslRepository()
const sslRequestUsecase = new SslRequestUsecase(sslRepository)
const sslRequestController = new SslRequestController(sslRequestUsecase)

routes.post('/v1/ssl', RouteAdapt(sslRequestController.post.bind(sslRequestController), logger))
routes.get('/v1/ssl/:name', RouteAdapt(sslRequestController.get.bind(sslRequestController), logger))

export {routes}