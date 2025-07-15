import { AxiosInstance } from 'axios'

export class Reports {
    constructor(private readonly axios: AxiosInstance) { }

    async getInvoicePdf(accessKey: string) {
        const resp = await this.axios.get(`reports/bill/${accessKey}`, { responseType: "arraybuffer" })
        const pdfBlob = new Blob([resp.data], { type: "application/pdf" })
        return pdfBlob
    }

}