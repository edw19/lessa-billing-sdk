import { AxiosInstance } from "axios";
import { CreateProductOnCompany, Product } from "../domain/product";
import { SalePrice, SalePriceCreateInput, SalePriceUpdateInput } from "../domain";

export class Products {
    constructor(private readonly http: AxiosInstance) { }

    async all(rucID: string) {
        const resp = await this.http.get<Product[]>(`products/${rucID}`)
        return resp.data
    }

    async createProductOnCompany(rucID: string, dto: CreateProductOnCompany) {
        const resp = await this.http.post<Product>(`products/${rucID}`, dto)
        return resp.data
    }

    async delete(productId: string) {
        const resp = await this.http.delete(`products/delete/${productId}`)
        return resp.data
    }

    // sales prices 

    async findSalePrices(productId: string) {
        const resp = await this.http.get<SalePrice[]>(`products/sale-prices/${productId}`)
        return resp.data
    }

    async createSalePrice(productId: string, dto: SalePriceCreateInput) {
        const resp = await this.http.post<SalePrice>(`products/sale-prices/${productId}`, dto)
        return resp.data
    }

    async updateSalePrice(salePriceId: string, dto: SalePriceUpdateInput) {
        const resp = await this.http.patch<SalePrice>(`products/sale-prices/${salePriceId}`, dto)
        return resp.data
    }

    async deleteSalePrice(salePriceId: string) {
        const resp = await this.http.delete(`products/sale-prices/${salePriceId}`)
        return resp.data
    }

    // images 

    async uploadImages(productId: string, data: FormData) {
        const resp = await this.http.post(`products/images/upload/${productId}`, data)
        return resp.data
    }

    async deleteImages(productId: string, imagesIDs: string) {
        const resp = await this.http.delete(`products/images/${productId}`, {
            params: { imagesIDs }
        })
        return resp.data
    }

}