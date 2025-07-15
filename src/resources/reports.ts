import { AxiosInstance } from 'axios'

export class Reports {
    constructor(private readonly axios: AxiosInstance) { }

    async getInvoicePdf(accessKey: string) {
        return await this.axios.get(`reports/bill/${accessKey}`, { responseType: "blob" })
    }

}