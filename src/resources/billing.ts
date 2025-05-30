import { AxiosInstance } from 'axios'

export class Billing {
    constructor(private axios: AxiosInstance) { }

    async invoice(ruc: string, establishmentCode: number, emissionPointCode: number, invoice: BillingInvoice) {
        const resp = await this.axios.post(`billing/invoice/${ruc}/${establishmentCode}/${emissionPointCode}`, invoice)
        return resp.data
    }

    async generateInvoice(ruc: string, establishmentCode: number, emissionPoint: number, data: BillingInvoice): Promise<{
        accessKey: string;
        xml: string;
    }> {
        const resp = await this.axios.post(`billing/invoice/generate/${ruc}/${establishmentCode}/${emissionPoint}`, data)
        return resp.data
    }

    async signInvoice({ accessKey, xml }: { accessKey: string, xml: string }) {
        const resp = await this.axios.post(`billing/invoice/sign/${accessKey}`, { xml })
        return resp.data
    }

    async sendInvoice({ accessKey, signedXml }: { accessKey: string, signedXml: string }) {
        const resp = await this.axios.post(`billing/invoice/send/${accessKey}`, { signedXml })
        return resp.data
    }

    async checkAuthorization(accessKey: string) {
        const resp = await this.axios.post(`billing/invoice/check/${accessKey}`, {}, { timeout: 0 })
        return resp.data
    }
}


export interface BillingInvoice {
    clientOnCompanyId: string;
    invoiceAssociationId?: string;
    paymentMethodCode: string;
    details: Detail[];
    billingReferenceDate?: Date
}

interface Detail {
    code: string;
    stubCode: string;
    description: string;
    discount: number;
    quantity: number;
    unitPrice: number;
    taxes: Tax[];
    AdditionalDetails?: AdditionalDetails[];
}

interface Tax {
    code: string;
    percentageCode: number;
    fee: number;
}

interface AdditionalDetails {
    name: string;
    value: string;
}
