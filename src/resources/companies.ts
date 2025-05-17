import { AxiosInstance } from 'axios'

export class Companies {
    constructor(private axios: AxiosInstance) { }
    async createCompany(data: { ruc: string, mainAddress: string, businessName: string, tradename: string, email: string, phone: string, userId: string }) {
        const resp = await this.axios.post("companies/create", data)
        return resp.data
    }

    async getCompanyByRuc(ruc: string) {
        const resp = await this.axios.get(`companies/${ruc}`)
        return resp.data
    }

    async updateCompany(ruc: string, data: { mainAddress: string, businessName: string, tradename: string, email: string, phone: string }) {
        const resp = await this.axios.patch(`companies/${ruc}`, data)
        return resp.data
    }

    async getClientsOnCompany(ruc: string): Promise<any[]> {
        const resp = await this.axios.get(`companies/clients/${ruc}`)
        return resp.data
    }

    async countClientsOnCompany(ruc: string): Promise<number> {
        const resp = await this.axios.get(`companies/clients/count/${ruc}`)
        return resp.data
    }


    async createPersonRelation(ruc: string, body: { identification: string }) {
        const resp = await this.axios.post(`companies/${ruc}/create-person-relation`, body)
        return resp.data
    }

    async getUserCompanies(userId: string): Promise<any[]> {
        const resp = await this.axios.get(`companies/user/${userId}`)
        return resp.data
    }
}
