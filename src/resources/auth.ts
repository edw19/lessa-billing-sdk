import { AxiosInstance } from 'axios'

export class Auth {
    constructor(private readonly axios: AxiosInstance) { }

    async loginGoogle(googleIdToken: string) {

        const resp = await this.axios.post(`auth/google`, {
            googleIdToken
        })

        return resp.data
    }
}