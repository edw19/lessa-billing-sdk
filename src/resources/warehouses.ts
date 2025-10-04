import { AxiosInstance } from "axios";
import { AllWarehousesWithEstablishment } from "../domain/warehouse";

export class Warehouses {

    constructor(private readonly http: AxiosInstance) { }

    async findAllWarehousesWithEstablishment(rucID: string) {
        const resp = await this.http.get<AllWarehousesWithEstablishment[]>(`warehouses/company/${rucID}`)
        return resp.data
    }

    async findWarehousesByEstablishmentsIDs(query: any) {
        const resp = await this.http.get<AllWarehousesWithEstablishment[]>(`warehouses/find`, {
            params: query
        })
        return resp.data
    }
}