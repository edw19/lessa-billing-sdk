import { AxiosInstance } from 'axios'
import { Tax } from '../domain'


export class Taxes {
    constructor(private axios: AxiosInstance) { }

    async getTaxes() {
        const resp = await this.axios.get<Omit<Tax, "id">[]>(`taxes`)
        return resp.data
    }
}

