import { KyInstance } from "ky";

export class Clients {
    constructor(private ky: KyInstance) { }


    async findClientOnCompany(identificationID: string, rucID: string) {
        return await this.ky.get(`clients/find/${identificationID}/${rucID}`).json()
    }


    async updateClient(currentIdentificationID: string, rucID: string, data: any) {

        const { identification, name, secondName, lastName, secondLastName, ...rest } = data

        const personalInfo = {
            ...(identification && { identification }),
            ...(name && { name }),
            ...(secondName && { secondName }),
            ...(lastName && { lastName }),
            ...(secondLastName && { secondLastName })
        }

        if (Object.keys(personalInfo).length > 0) {
            await this.ky.patch(`people/update/${currentIdentificationID}`, {
                json: {
                    ...(identification && { identification }),
                    ...(name && { name }),
                    ...(secondName && { secondName }),
                    ...(lastName && { lastName }),
                    ...(secondLastName && { secondLastName })
                }
            })
        }

        const updatedIdentification = identification && identification !== currentIdentificationID
            ? identification
            : currentIdentificationID;

        return await this.ky.patch(`clients/update/${updatedIdentification}/${rucID}`, { json: rest }).json()
    }

}