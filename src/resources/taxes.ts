import { KyInstance } from "ky"

export class Taxes {
    constructor(private ky: KyInstance) { }

    async getTaxes() {
        return await this.ky.get(`taxes`).json<any[]>()
    }
}