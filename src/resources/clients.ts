import { AxiosInstance } from 'axios'

export class Clients {
    constructor(private axios: AxiosInstance) { }


    async findClientOnCompany(identificationID: string, rucID: string) {
        const resp = await this.axios.get(`clients/find/${identificationID}/${rucID}`)
        return resp.data
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
            await this.axios.patch(`people/update/${currentIdentificationID}`, {
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

        const resp = await this.axios.patch(`clients/update/${updatedIdentification}/${rucID}`, rest)
        return resp.data
    }

}