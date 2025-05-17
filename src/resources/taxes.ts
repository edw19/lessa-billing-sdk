import { AxiosInstance } from 'axios'


export class Taxes {
    constructor(private axios: AxiosInstance) { }

    async getTaxes() {
        const resp = await this.axios.get<Tax[]>(`taxes`)
        return resp.data
    }
}

interface Tax {
    name: string
    code: string
    percentageCode: number
    fee: number
}