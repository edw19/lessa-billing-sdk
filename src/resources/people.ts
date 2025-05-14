import { KyInstance } from "ky";

export class People {
    constructor(private ky: KyInstance) { }

    async findPersonByIdentification(identification: string) {
        return await this.ky.get(`people/find/${identification}`).json()
    }

    async validateIdentification(identification: string) {
        return await this.ky.get(`people/validate/${identification}`)
    }

}