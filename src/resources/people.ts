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

    async createPerson(body: {type: string, identification: string, name: string, secondName?: string, lastName: string, secondLastName?: string, address: string, email: string, phone: string }) {
        const resp = await this.axios.post('people/create', body)
        return resp.data
    }

}