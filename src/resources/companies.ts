import { KyInstance } from 'ky'

export class Companies {
    constructor(private ky: KyInstance) { }
    async createCompany(data: { ruc: string, mainAddress: string, businessName: string, tradename: string, email: string, phone: string, userId: string }) {
        return await this.ky.post("companies/create", { json: data }).json()
    }

    async getCompanyByRuc(ruc: string) {
        return await this.ky.get(`companies/${ruc}`).json<any>()
    }

    async updateCompany(ruc: string, data: { mainAddress: string, businessName: string, tradename: string, email: string, phone: string }) {
        return await this.ky.patch(`companies/${ruc}`, { json: data }).json()
    }

    async getClientsOnCompany(ruc: string): Promise<any[]> {
        return await this.ky.get(`companies/clients/${ruc}`).json()
    }

    async createPersonRelation(ruc: string, body: { identification: string }) {
        return await this.ky.post(`companies/${ruc}/create-person-relation`, { json: body }).json()
    }

    async getUserCompanies(userId: string): Promise<any[]> {
        return await this.ky.get(`companies/user/${userId}`).json()
    }
}
