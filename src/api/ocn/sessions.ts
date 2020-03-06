/*
    Copyright 2020 Smart Charging Solutions

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import { Forwarder } from "./forwarder";
import { ISession } from "scn-bridge/dist/models/scpi/session";
import { Session } from "../../models/translators/session";
import { IPaginationParams } from "scn-bridge/dist/models/scpi/common";

export class Sessions extends Forwarder {

    public sender = {

        getList: async (params: IPaginationParams): Promise<ISession[]> => {
            let endpoint = await this.backendDb.getEndpoint("sessions", "SENDER")
            endpoint += `?date_from=${params.date_from}`
            const result = await this.makeScpiRequest("GET", endpoint)
            if (!result) {
                return []
            }
            return result.map((session: any) => new Session(session, this.country_code, this.party_id))
        }

    }

}
