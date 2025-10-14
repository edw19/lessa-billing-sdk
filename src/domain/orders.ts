import { Table } from "../resources/orders";
import { Client } from "./client";

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
    client: Client | null;
}

export interface CreateOrderInput {
    observation: string;
    type?: string;

    payWith: number
    orderItems: Omit<OrderItem, 'id' | 'orderId' | 'createdAt' | 'updatedAt'>[];
    clientIdentification: string
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
