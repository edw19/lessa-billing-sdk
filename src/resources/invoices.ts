import { KyInstance } from "ky";

export class Invoices {
    constructor(private ky: KyInstance) { }

    async getInvoicesByAssociationId(clientOnCompanyId: string, skip: number, take: number) {
        return await this.ky.get(`invoices/association/${clientOnCompanyId}`,
            {
                searchParams: {
                    skip,
                    take
                }
            }).json()
    }

    async getInvoicesByRuc(ruc: string, date: string) {
        return await this.ky.get(`invoices/company/${ruc}`, { searchParams: { date } }).json<any[]>()
    }
}