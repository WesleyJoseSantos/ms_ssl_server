import { HttpRequest, HttpResponse } from "@infrastructure/http_server";
import { ControllerBase } from "@shared/utils/controller_base";

export class ProvControllerV2  extends ControllerBase {
    constructor() {
        super()
    }

    public async post(req: HttpRequest) : Promise <HttpResponse> {
        return this.ok({body: 
            {
                network: {
                    collectorId: 3,
                    companyId: 1,
                    bleHdrMac: "4548AABB0000",
                },
                mqtt: {
                    url : "192.168.1.6",
                    buser : "",
                    bpass : "",
                    port : 8883,
                    qos : 0,
                    ssl : true
                },
                ntp: {
                    opMode : 0,
                    syncMode : 0,
                    server1 : "pool.ntp.org",
                    server2 : null,
                    server3 : null
                },
                sslReq : {
                    name : req.body.ewMac,
                    days : "1",
                    pass : "hdrbroker",
                    country : "BR",
                    state : "MG",
                    locality : "Divinopolis",
                    org : "Hedro",
                    unit : "Hedro Sistemas Inteligentes",
                    cn : req.body.bleOriginalMac,
                    email : req.body.email,
                }
            }
        })
    }
}