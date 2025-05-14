import { KyInstance } from 'ky'

export class Companies {
    constructor(private ky: KyInstance) { }

    async create(data: {
        ruc: string
        mainAddress: string
        businessName: string
        tradename: string
        email: string
        phone: string
        userId: string
    }) {
        return await this.ky.post('companies/create', { json: data }).json()
    }

    async getByRuc(ruc: string) {
        return await this.ky.get(`companies/${ruc}`).json()
    }

    async update(ruc: string, data: {
        mainAddress: string
        businessName: string
        tradename: string
        email: string
        phone: string
    }) {
        return await this.ky.patch(`companies/${ruc}`, { json: data }).json()
    }

    async getByUserId(userId: string) {
        return await this.ky.get(`companies/user/${userId}`).json()
    }
}
