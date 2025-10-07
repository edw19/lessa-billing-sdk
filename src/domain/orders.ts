
export interface CreateOrderInput {
    observation: string;
    orderItems: OrderItem[];
}

export interface OrderItem {
    name: string;
    price: number;
    qty: number;
    observation: string;
}