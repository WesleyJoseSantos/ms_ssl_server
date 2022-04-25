import { HttpRequest, HttpResponse } from "@infrastructure/http_server";
import { ControllerBase } from "@shared/utils/controller_base";

export class ProvControllerV1  extends ControllerBase {
    constructor() {
        super()
    }

    public async post(req: HttpRequest) : Promise <HttpResponse> {
        return this.ok({body: 
            {
                collectorId: 3,
                companyId: 1,
                bleHdrMac: "4548AABB0000",
                buser : "hdr@BrokerH",
                bpass : "hdrGcpBroker",
            }
        })
    }
}