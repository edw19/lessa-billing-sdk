import { AxiosInstance } from "axios";
import { CategoryProduct, CategoryProductCreate, CategoryProductUpdate } from "../domain/category-product";

export class CategoryProducts {
    constructor(private readonly http: AxiosInstance) { }

    async all(rucID: string) {
        const resp = await this.http.get<CategoryProduct[]>(`category-products/${rucID}`)
        return resp.data
    }

    async create(rucID: string, categoryProduct: CategoryProductCreate) {
        const resp = await this.http.post<CategoryProduct>(`category-products/${rucID}`, categoryProduct)
        return resp.data
    }

    async update(rucID: string, categoryProduct: CategoryProductUpdate) {
        const resp = await this.http.patch<CategoryProduct>(`category-products/${rucID}`, categoryProduct)
        return resp.data
    }

}