import { AxiosInstance } from 'axios'

export class CompaniesOnCompanies {
    constructor(private readonly axios: AxiosInstance) { }

    async deleteCompany(rucProvider: string, rucClient: string) {
        const resp = await this.axios.delete(`companies/delete-company-on-company/${rucProvider}/${rucClient}`)
        return resp.data
    }
}
