import { AxiosInstance } from 'axios'


export type OrderList = Order[]

export interface Order {
    id: string;
    status: string;
    observation: string;
    createdAt: string;
    updatedAt: string;
    tableId: string;
    establishmentId: string;
    items: OrderItem[];
    table: Table;
}

export interface Table {
    id: string;
    name: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    establishmentId: string;
}

export interface OrderItem {
    id: string;
    name: string;
    qty: number;
    observation: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    orderId: string;
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

    async create(establishmentId: string, tableId: string, dto: any) {
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