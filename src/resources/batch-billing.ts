import { AxiosInstance } from 'axios'
import { BillingInvoice, GenerateBatchBilling } from './billing'

export class BatchBilling {
    constructor(private readonly axios: AxiosInstance) { }

    async generateInvoicesBatch(ruc: string, establishmentCode: number, emissionPointCode: number, invoices: BillingInvoice[]) {
        const resp = await this.axios.post(`batch-billing/invoices/generate/${ruc}/${establishmentCode}/${emissionPointCode}`, invoices)
        return resp.data
    }

    async signInvoicesBatch(billingProcessId: string) {
        const resp = await this.axios.post(`/batch-billing/invoices/sign/${billingProcessId}`)
        return resp.data
    }

    async sendInvoicesBatch(billingProcessId: string) {
        const resp = await this.axios.post(`batch-billing/invoices/send/${billingProcessId}`)
        return resp.data
    }

    async checkAuthorizationInvoicesBatch(billingProcessId: string) {
        const resp = await this.axios.post(`batch-billing/invoices/check/${billingProcessId}`)
        return resp.data
    }

    async batchInvoices(ruc: string, establishmentCode: number, emissionPointCode: number, data: GenerateBatchBilling) {
        const resp = await this.axios.post(`batch-billing/invoices/${ruc}/${establishmentCode}/${emissionPointCode}`, data, { timeout: 0 })
        return resp.data
    }

    async getBillingProcess(ruc: string) {
        const resp = await this.axios.get(`batch-billing/processes/${ruc}`)
        return resp.data
    }

    async updateBillingProcess(billingProcessId: string, data: any) {
        const resp = await this.axios.patch(`batch-billing/processes/${billingProcessId}`, data)
        return resp.data
    }
}