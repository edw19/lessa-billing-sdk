import { AxiosInstance } from 'axios'

export class Billing {
    constructor(private axios: AxiosInstance) { }


    async generateInvoice(data: any): Promise<{
        accessKey: string;
        xml: string;
    }> {
        const resp = await this.axios.post("billing/invoice/generate", data)
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