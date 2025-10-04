import { AxiosInstance } from "axios";
import { CreateProductOnCompany, Product } from "../domain/product";

export class Products {
    constructor(private readonly http: AxiosInstance) { }

    async all(rucID: string) {
        const resp = await this.http.get<Product[]>(`products/${rucID}`)
        return resp.data
    }

    async createProductOnCompany(rucID:string, dto: CreateProductOnCompany ) {
        const resp = await this.http.post<Product>(`products/${rucID}`, dto)
        return resp.data
    }
}