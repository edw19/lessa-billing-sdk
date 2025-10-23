import { AxiosInstance } from "axios";
import { Purchase } from "./purchases.domain";

export class PurchasesResource {

    constructor(private readonly axios: AxiosInstance) { }

    async findByEstablishment(rucID: string) {
        const resp = await this.axios.get<Purchase[]>(`purchases/${rucID}`)
        return resp.data
    }

}