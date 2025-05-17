import { AxiosInstance } from 'axios'

export class EmissionPoints {
    constructor(private axios: AxiosInstance) { }

    async getEmissionPoints(establishmentId: string): Promise<any[]> {
        const resp = await this.axios.get(`emission-points/establishment/${establishmentId}`)
        return resp.data
    }

    async getEmissionPointByRucAndEstablishmentCodeAndEmissionPoint(ruc: string, establishmentCode: number, emissionPoint: number) {
        const resp = await this.axios.get(`emission-points/find-one/${ruc}/${establishmentCode}/${emissionPoint}`)
        return resp.data
    }

    async getEmissionPointsFromEstablishment(ruc: string, establishmentCode: number) {
        const resp = await this.axios.get(`emission-points/find/${ruc}/${establishmentCode}`)
        return resp.data
    }

    async updateEmissionPoint(emissionPointId: string, data: any) {
        const resp = await this.axios.patch(`emission-points/${emissionPointId}`, { json: data })
        return resp.data
    }

}