import { AxiosInstance } from 'axios'
import { BillingInvoice } from './billing'

export class BatchBilling {
    constructor(private readonly axios: AxiosInstance) { }

    async generateInvoicesBatch(ruc: string, establishmentCode: number, emissionPointCode: number, invoices: BillingInvoice[]) {
        const resp = await this.axios.post(`billing/batch/invoices/generate/${ruc}/${establishmentCode}/${emissionPointCode}`, invoices)
        return resp.data
    }

    async signInvoicesBatch(billingProcessId: string) {
        const resp = await this.axios.post(`/billing/batch/invoices/sign/${billingProcessId}`)
        return resp.data
    }

    async sendInvoicesBatch(billingProcessId: string) {
        const resp = await this.axios.post(`billing/batch/invoices/send/${billingProcessId}`)
        return resp.data
    }

    async checkAuthorizationInvoicesBatch(billingProcessId: string) {
        const resp = await this.axios.post(`billing/batch/invoices/check/${billingProcessId}`)
        return resp.data
    }

    async batchInvoices(ruc: string, establishmentCode: number, emissionPointCode: number, invoices: BillingInvoice[]) {
        const resp = await this.axios.post(`billing/batch/invoices/${ruc}/${establishmentCode}/${emissionPointCode}`, invoices, { timeout: 0 })
        return resp.data
    }
}