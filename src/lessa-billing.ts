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
import axios, { AxiosInstance } from 'axios'

 type LessaBillingEnvironment = "Production" | "Test" | "Development"

type LessaBillingOptions = {
    environment: LessaBillingEnvironment,
    url: string
}[]

export class LessaBillingSDK {
    private axios: AxiosInstance

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
            environment: "Test",
            url: "https://lessa-billing-api-preview.up.railway.app"
        },
        {
            environment: "Development",
            url: "http://localhost:5000"
        }
    ]

    constructor(environment: LessaBillingEnvironment) {

        const environmentConfig = !environment
            ? this.environments.find(e => e.environment === "Test")
            : this.environments.find(e => e.environment === environment)

        if (!environmentConfig) {
            throw new Error(`Invalid environment: ${environment}`)
        }

        this.axios = axios.create({
            baseURL: `${environmentConfig.url}/api`,
        })

        this.companies = new Companies(this.axios)
        this.clients = new Clients(this.axios)
        this.signatures = new Signatures(this.axios)
        this.billing = new Billing(this.axios)
        this.invoices = new Invoices(this.axios)
        this.reports = new Reports(this.axios)
        this.emissionPoints = new EmissionPoints(this.axios)
        this.establishments = new Establishments(this.axios)
        this.people = new People(this.axios)
        this.batchBilling = new BatchBilling(this.axios)
        this.taxes = new Taxes(this.axios)
    }
}
