import { Pagination } from "../../domain";

export type PaginatedResponse<T> = {
    items: T[];
    totals: {
        total: number;
        discount: number;
        subTotal: number;
    }
    pagination: Pagination;
}

export interface QueryPurchases {
    status?: string[],
    take?: number,
    skip?: number
}


export interface Purchase {
    id: string;
    observation: string;
    total: string;
    subTotal: string;
    balance: string;
    discount: string;
    documentType: string;
    documentNumber: string;
    issueDate: string;
    dueDate: null;
    paymentType: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    ruc: string;
    establishmentId: string;
    emissionPointId: string;
    rucCompany: null;
    rucProvider: null;

    supplier: Supplier
}


interface Supplier {
    ruc: string,
    tradename: string
    businessName: string
    mainAddress: string
}


export interface CreatePurchaseInput {
    observation: string;
    total: number;
    subTotal: number;
    discount: number;
    accessKey: string;
    issueDate: Date | string;
    dueDate?: Date | string;
    paymentType: string;
    status: string;
    items: Item[];
    supplier: Supplier
    documentType: string;
}

interface Item {
    productName: string;
    productCode: string;
    qty: number;
    price: number;
    discount: number;
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    total: number;
}