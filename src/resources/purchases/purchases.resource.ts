import { AxiosInstance } from "axios";
import { CreatePurchaseInput, PaginatedResponse, Purchase, QueryPurchases } from "./purchases.domain";
import qs from "qs";

export class PurchasesResource {

    constructor(private readonly axios: AxiosInstance) { }

    async findByCompany(rucID: string, query: QueryPurchases) {
        const resp = await this.axios.get<PaginatedResponse<Purchase>>(`purchases/${rucID}`, {
            params: query,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })
        })
        return resp.data
    }

    async create(rucID: string, establishmentCode: number, emissionPoint: number, body: CreatePurchaseInput) {
        const resp = await this.axios.post(`purchases/${rucID}/${establishmentCode}/${emissionPoint}`, body)
        return resp.data
    }

}

