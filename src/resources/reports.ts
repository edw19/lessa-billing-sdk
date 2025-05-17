import { AxiosInstance } from 'axios'

export class Reports {
    constructor(private readonly axios: AxiosInstance) { }

    async getInvoicePdf(accessKey: string) {
        const resp = await this.axios.get(`reports/bill/${accessKey}`, { responseType: "blob" })
        return resp.data
    }

}