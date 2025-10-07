import { AxiosInstance } from 'axios'
import { Table } from './orders'


export class Tables {
    constructor(private readonly http: AxiosInstance) { }

    async byEstablishment(establishmentId: string) {
        const resp = await this.http.get<Table[]>(`tables/establishment/${establishmentId}`)
        return resp.data
    }

    async create(establishmentId: string, dto: any) {
        const resp = await this.http.post(`tables/establishment/${establishmentId}`, dto)
        return resp.data
    }
}