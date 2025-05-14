import { KyInstance } from "ky";

export class Establishments {
    constructor(private ky: KyInstance) { }

    async getEstablishments(ruc: string): Promise<any[]> {
        return await this.ky.get(`establishments/company/${ruc}`).json()
    }

}