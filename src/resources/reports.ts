import { KyInstance } from "ky";

export class Reports {
    constructor(private readonly ky: KyInstance) { }

    async getInvoicePdf(accessKey: string) {
        return await this.ky.get(`reports/bill/${accessKey}`).blob()
    }

}