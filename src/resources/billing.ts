import { KyInstance } from "ky";

export class Billing {
    constructor(private ky: KyInstance) { }


    async generateInvoice(data: any): Promise<{
        accessKey: string;
        xml: string;
    }> {
        return await this.ky.post("billing/invoice/generate", {
            json: data
        }).json<{
            accessKey: string;
            xml: string;
        }>()
    }

    async signInvoice({ accessKey, xml }: { accessKey: string, xml: string }) {
        return await this.ky.post(`billing/invoice/sign/${accessKey}`, {
            json: {
                xml
            }
        }).json()
    }

    async sendInvoice({ accessKey, signedXml }: { accessKey: string, signedXml: string }) {
        return await this.ky.post(`billing/invoice/send/${accessKey}`, {
            json: {
                signedXml
            }
        }).json()
    }

    async checkAuthorization(accessKey: string) {
        return await this.ky.post(`billing/invoice/check/${accessKey}`, {
            timeout: false
        }).json()
    }
}