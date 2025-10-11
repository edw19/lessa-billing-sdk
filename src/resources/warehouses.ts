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

    async findByEstablishmentId(establishmentId: string) {
        const resp = await this.http.get(`warehouses/establishment/${establishmentId}`)
        return resp.data
    }

    async findWarehouses(rucID: string, establishmentCode: number) {
        const resp = await this.http.get(`warehouses/find/${rucID}/${establishmentCode}`)
        return resp.data
    }

    async findOne(warehouseId: string) {
        const resp = await this.http.get(`warehouses/${warehouseId}`)
        return resp.data
    }
}