import ky, { KyInstance } from 'ky'
import { Companies } from './resources/companies'
import { Clients } from './resources/clients'
import { Signatures } from './resources/signatures'
import { Billing } from './resources/billing'
import { Invoices } from './resources/invoices'

interface LessaBillingOptions {
    apiUrl: string
}

export class LessaBillingSDK {
    private ky: KyInstance

    public companies: Companies
    public clients: Clients
    public signatures: Signatures
    public billing: Billing
    public invoices: Invoices

    constructor({ apiUrl }: LessaBillingOptions) {
        this.ky = ky.create({
            prefixUrl: `${apiUrl}/api`,
            retry: 0
        })

        this.companies = new Companies(this.ky)
        this.clients = new Clients(this.ky)
        this.signatures = new Signatures(this.ky)
        this.billing = new Billing(this.ky)
        this.invoices = new Invoices(this.ky)
    }
}
