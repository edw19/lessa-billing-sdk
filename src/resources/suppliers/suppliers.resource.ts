import { AxiosInstance } from "axios";
import { Supplier } from "./supliers.domain";

export class SuppliersResource {

    constructor(private readonly axios: AxiosInstance) { }


    async findByCompany(rucID: string) {
        const resp = await this.axios.get<Supplier[]>(`suppliers/${rucID}`)
        return resp.data
    }

}