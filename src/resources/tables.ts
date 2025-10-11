import { AxiosInstance } from 'axios'
import { Table } from './orders'


export class Tables {
    constructor(private readonly http: AxiosInstance) { }

    async byEstablishment(rucID: string, establishmentCode: number) {
        const resp = await this.http.get<Table[]>(`tables/${rucID}/${establishmentCode}`)
        return resp.data
    }

    async create(rucID: string, establishmentCode: number, dto: any) {
        const resp = await this.http.post(`tables/${rucID}/${establishmentCode}`, dto)
        return resp.data
    }
}