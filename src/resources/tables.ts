import { AxiosInstance } from 'axios'

export interface Table {
    id: string;
    name: string;
    status: number;
    createdAt: string;
    updatedAt: string;
    establishmentId: string;
}

export class Tables {
    constructor(private readonly http: AxiosInstance) { }

    async byEstablishment(establishmentId: string) {
        const resp = await this.http.get(`tables/establishment/${establishmentId}`)
        return resp.data
    }

    async create(establishmentId: string, dto: any) {
        const resp = await this.http.post(`tables/establishment/${establishmentId}`, dto)
        return resp.data
    }
}