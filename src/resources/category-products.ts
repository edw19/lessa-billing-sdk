import { AxiosInstance } from "axios";
import { CategoryProduct } from "../domain/category-product";

export class CategoryProducts {
    constructor(private readonly http: AxiosInstance) { }

    async all(rucID: string) {
        const resp = await this.http.get<CategoryProduct[]>(`category-products/${rucID}`)
        return resp.data
    }

}