import { AxiosInstance } from 'axios'

export class BatchBilling {
    constructor(private readonly axios: AxiosInstance) { }

    async sendInvoicesBatch(ruc: string, establishmentCode: number, emissionPointCode: number, invoices: any[]) {
        const resp = await this.axios.post(`billing/batch/invoices/send/${ruc}/${establishmentCode}/${emissionPointCode}`, invoices)
        return resp.data
    }

    async checkAuthorizationInvoicesBatch(accessKeyBatch: string) {
        const resp = await this.axios.post(`billing/batch/invoices/check/${accessKeyBatch}`)
        return resp.data
    }

    async batchInvoices(ruc: string, establishmentCode: number, emissionPointCode: number, invoices: any[]) {
        try {
            await this.axios.post(`billing/batch/invoices/${ruc}/${establishmentCode}/${emissionPointCode}`, invoices, { timeout: 0 })
        } catch (error: any) {
            console.log({ error })
            throw new Error("Error sending batch invoices")
        }
    }
}