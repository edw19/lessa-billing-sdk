import { KyInstance } from "ky";

export class BatchBilling {
    constructor(private readonly ky: KyInstance) { }

    async sendInvoicesBatch(ruc: string, establishmentCode: number, emissionPointCode: number, invoices: any[]) {
        return await this.ky.post(`billing/batch/invoices/send/${ruc}/${establishmentCode}/${emissionPointCode}`, {
            json: invoices
        }).json<{ accessKeyBatch: string }>()
    }

    async checkAuthorizationInvoicesBatch(accessKeyBatch: string) {
        return await this.ky.post(`billing/batch/invoices/check/${accessKeyBatch}`).json()
    }

    async batchInvoices(ruc: string, establishmentCode: number, emissionPointCode: number, invoices: any[]) {
        return await this.ky.post(`billing/batch/invoices/${ruc}/${establishmentCode}/${emissionPointCode}`, {
            timeout: false,
            json: invoices
        }).json<{ accessKeyBatch: string }>()
    }
}