import { HttpRequest, HttpResponse } from '../../infrastructure/http_server';
import { ControllerBase } from '../../shared/utils/controller_base';

export class SignInController  extends ControllerBase {
    constructor() {
        super()
    }

    public async post(req: HttpRequest) : Promise <HttpResponse> {
        return this.ok({body: 
            {
                accessToken : 'accessToker'
            }
        })
    }
}