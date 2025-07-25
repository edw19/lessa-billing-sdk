import { AxiosInstance } from 'axios'

export class Invoices {
    constructor(private axios: AxiosInstance) { }

    async getInvoicesByAssociationId(clientOnCompanyId: string, skip: number, take: number) {
        const resp = await this.axios.get(`invoices/association/${clientOnCompanyId}`,
            {
                params: {
                    skip,
                    take
                }
            })
        return resp.data
    }

    async getInvoicesByRuc(ruc: string, date: string) {
        const resp = await this.axios.get(`invoices/company/${ruc}`, { params: { date } })
        return resp.data
    }

    async getInvoicesByClientOnCompany(identificationID: string, rucID: string, skip: number, take: number) {
        const resp = await this.axios.get(`invoices/clientOnCompany/${identificationID}/${rucID}`, {
            params: {
                skip,
                take
            }
        })

        return resp.data
    }
    async getInvoicesByCompanyOnCompany(rucClient: string, rucProvider: string, skip: number, take: number) {
        const resp = await this.axios.get(`invoices/companyOnCompany/${rucClient}/${rucProvider}`, {
            params: {
                skip,
                take
            }
        })

        return resp.data
    }
}