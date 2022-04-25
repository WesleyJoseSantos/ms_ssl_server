export abstract class BaseController {
    abstract handler (message: {content: Buffer}) : Promise<boolean>
}