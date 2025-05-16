import ky, { KyInstance } from 'ky'
import { Companies } from './resources/companies'
import { Clients } from './resources/clients'
import { Signatures } from './resources/signatures'
import { Billing } from './resources/billing'
import { Invoices } from './resources/invoices'
import { Reports } from './resources/reports'
import { People } from './resources/people'
import { Establishments } from './resources/establishments'
import { EmissionPoints } from './resources/emission-points'
import { BatchBilling } from './resources/batch-billing'
import { Taxes } from './resources/taxes'

type LessaBillingEnvironment = "Production" | "Preview" | "Development"

type LessaBillingOptions = {
    environment: LessaBillingEnvironment,
    url: string
}[]

export class LessaBillingSDK {
    private ky: KyInstance

    public companies: Companies
    public clients: Clients
    public signatures: Signatures
    public billing: Billing
    public invoices: Invoices
    public reports: Reports
    public emissionPoints: EmissionPoints
    public establishments: Establishments
    public people: People
    public batchBilling: BatchBilling
    public taxes: Taxes


    private environments: LessaBillingOptions = [
        {
            environment: "Production",
            url: "https://lessa-billing-api-production.up.railway.app"
        },
        {
            environment: "Preview",
            url: "https://lessa-billing-api-preview.up.railway.app"
        },
        {
            environment: "Development",
            url: "http://localhost:5000"
        }
    ]

    constructor(environment?: LessaBillingEnvironment) {

        const environmentConfig = !environment
            ? this.environments.find(e => e.environment === "Preview")
            : this.environments.find(e => e.environment === environment)

        if (!environmentConfig) {
            throw new Error(`Invalid environment: ${environment}`)
        }

        this.ky = ky.create({
            prefixUrl: `${environmentConfig.url}/api`,
            retry: 0
        })

        this.companies = new Companies(this.ky)
        this.clients = new Clients(this.ky)
        this.signatures = new Signatures(this.ky)
        this.billing = new Billing(this.ky)
        this.invoices = new Invoices(this.ky)
        this.reports = new Reports(this.ky)
        this.emissionPoints = new EmissionPoints(this.ky)
        this.establishments = new Establishments(this.ky)
        this.people = new People(this.ky)
        this.batchBilling = new BatchBilling(this.ky)
        this.taxes = new Taxes(this.ky)
    }
}
