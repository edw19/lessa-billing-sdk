import { Table } from "../resources/orders";

export interface Order {
    id: string;
    status: string;
    type: string;
    observation: string;
    createdAt: string;
    updatedAt: string;
    tableId: string;
    establishmentId: string;
    items: OrderItem[];
    table: Table;
}

export interface CreateOrderInput {
    observation: string;
    type?: string;
    orderItems: Omit<OrderItem, 'id' | 'orderId' | 'createdAt' | 'updatedAt'>[];
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
