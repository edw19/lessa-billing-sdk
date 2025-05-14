export class Signatures {
    constructor(private ky: any) { }
    async getSignatures(ruc: string): Promise<any[]> {
        return await this.ky.get(`signatures/company/${ruc}`).json()
    }

    async updateSignature(data: any) {
        return await this.ky.patch(`signatures/update/${data.ruc}/${data.id}`, { json: { selected: data.selected } }).json()
    }

    async createSignature(ruc: string, formData: FormData) {
        return await this.ky.post(`signatures/create/${ruc}`, { body: formData }).json()
    }
}