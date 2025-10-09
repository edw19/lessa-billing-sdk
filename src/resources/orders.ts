import { AxiosInstance } from 'axios'
import { CreateOrderInput, Order } from '../domain/orders';


export type OrderList = Order[]



export interface Table {
    id: string;
    name: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    establishmentId: string;
}



export class Orders {
    constructor(private readonly http: AxiosInstance) { }

    // orders 
    async byEstablishment(establishmentId: string, queryParams: any): Promise<Order[]> {
        const resp = await this.http.get(`orders/establishment/${establishmentId}`, {
            params: queryParams
        })
        return resp.data
    }

    async create(establishmentId: string, tableId: string, dto: CreateOrderInput) {
        const resp = await this.http.post(`orders/establishment/${establishmentId}/${tableId}`, dto)
        return resp.data
    }

    async update(orderId: string, dto: any) {
        const resp = await this.http.patch(`orders/${orderId}`, dto)
        return resp.data
    }

    async delete(orderId: string) {
        const resp = await this.http.delete(`orders/${orderId}`)
        return resp.data
    }

    // order items

    async createOrderItem(orderId: string, dto: any) {
        const resp = await this.http.post(`orders/items/${orderId}`, dto)
        return resp.data
    }

    async updateOrderItem(orderItemId: string, dto: any) {
        const resp = await this.http.patch(`orders/items/${orderItemId}`, dto)
        return resp.data
    }

    async deleteOrderItem(orderItemId: string) {
        const resp = await this.http.delete(`orders/items/${orderItemId}`)
        return resp.data
    }
}