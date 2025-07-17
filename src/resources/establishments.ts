import { AxiosInstance } from 'axios'

export class Establishments {
    constructor(private axios: AxiosInstance) { }

    async getEstablishments(ruc: string): Promise<any[]> {
        const resp = await this.axios.get(`establishments/company/${ruc}`)
        return resp.data
    }

    async createEstablishment(ruc: string, data: any) {
        throw new Error('Method not implemented.')
    }

}