import { Person } from "./person";

export interface Client {
    balance: number;
    email: string;
    phone: string;
    address: string;
    billingAdress: string;
    identificationID: string;
    rucID: string;
    status: number;
    assignedAt: string;
    assignedBy: string;
    clientOnCompanyId: string;

    person: Person;
}