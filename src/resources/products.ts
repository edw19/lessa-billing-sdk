import { AxiosInstance } from "axios";
import { Product } from "../domain/product";

export class Products {
    constructor(private readonly http: AxiosInstance) { }

    async all(rucID: string) {
        const resp = await this.http.get<Product[]>(`products/${rucID}`)
        return resp.data
    }
}