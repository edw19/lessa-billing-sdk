import { AxiosInstance } from 'axios'

export class Signatures {
    constructor(private axios: AxiosInstance) { }
    async getSignatures(ruc: string): Promise<any[]> {
        const resp = await this.axios.get(`signatures/company/${ruc}`)
        return resp.data
    }

    async updateSignature(data: any) {
        const resp = await this.axios.patch(`signatures/update/${data.ruc}/${data.id}`, { selected: data.selected })
        return resp.data
    }

    async createSignature(ruc: string, formData: FormData) {
        const resp = await this.axios.post(`signatures/create/${ruc}`, formData)
        return resp.data
    }
}