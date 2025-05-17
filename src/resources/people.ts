import { AxiosInstance } from 'axios'

export class People {
    constructor(private axios: AxiosInstance) { }

    async findPersonByIdentification(identification: string) {
        const resp = await this.axios.get(`people/find/${identification}`)
        return resp.data
    }

    async validateIdentification(identification: string) {
        const resp = await this.axios.get(`people/validate/${identification}`)
        return resp.data
    }

}