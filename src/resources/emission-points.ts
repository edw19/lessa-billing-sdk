import { KyInstance } from "ky";

export class EmissionPoints {
    constructor(private ky: KyInstance) {

    }

    async getEmissionPoints(establishmentId: string): Promise<any[]> {
        return await this.ky.get(`emission-points/establishment/${establishmentId}`).json()
    }

    async getEmissionPointByRucAndEstablishmentCodeAndEmissionPoint(ruc: string, establishmentCode: number, emissionPoint: number) {
        return await this.ky.get(`emission-points/find-one/${ruc}/${establishmentCode}/${emissionPoint}`).json<{
            id: string;
            point: number;
            sequential: number;
            status: number;
            createdAt: string;
            updatedAt: string;
            establishmentId: string;
            pointLabel: string;
        }>()
    }

    async getEmissionPointsFromEstablishment(ruc: string, establishmentCode: number) {
        return await this.ky.get(`emission-points/find/${ruc}/${establishmentCode}`).json()
    }

    async updateEmissionPoint(emissionPointId: string, data: any) {
        return await this.ky.patch(`emission-points/${emissionPointId}`, { json: data }).json()
    }

}