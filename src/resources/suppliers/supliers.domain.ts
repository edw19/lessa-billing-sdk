
export interface Supplier {
    balance: number;
    businessName: string;
    phone: string;
    email: string;
    mainAddress: string;
    rucProvider: string;
    rucClient: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    provider: Provider;
}

interface Provider {
    ruc: string;
    email: string;
    businessName: string;
    tradename: string;
    phone: string;
    mainAddress: string;
    slogan: null;
    regime: string;
    accounting: string;
    validated: boolean;
    status: number;
    createdAt: string;
    updatedAt: string;
    userId: string;
    userLocalId: null;
}