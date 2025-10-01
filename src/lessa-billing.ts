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
import { CompaniesOnCompanies } from './resources/companies-on-companies'
import { Auth } from './resources/auth'
import { Orders } from './resources/orders'
import { Tables } from './resources/tables'
import { CategoryProducts } from './resources/category-products'
import { Products } from './resources/products'

type LessaBillingEnvironment = "Production" | "Test" | "Development" | (string & {})

type LessaBillingOptions = {
    environment: LessaBillingEnvironment,
    url: string
}[]


const environments: LessaBillingOptions = [
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

export class LessaBillingSDK {
    private http: AxiosInstance

    public companies: Companies
    public companiesOnCompanies: CompaniesOnCompanies
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
    public orders: Orders
    public tables: Tables
    public categoryProducts: CategoryProducts
    public products: Products

    constructor(API_KEY: string, config?: { environment?: LessaBillingEnvironment }) {

        const environmentConfig = !config?.environment
            ? environments.find(e => e.environment === "Test")
            : environments.find(e => e.environment === config?.environment)

        if (!environmentConfig) {
            throw new Error(`Invalid environment: ${config?.environment}`)
        }

        this.http = axios.create({
            baseURL: `${environmentConfig.url}/api`,
            headers: {
                "x-lessa-api-key": API_KEY,
            }
        })

        this.companies = new Companies(this.http)
        this.companiesOnCompanies = new CompaniesOnCompanies(this.http)
        this.clients = new Clients(this.http)
        this.signatures = new Signatures(this.http)
        this.billing = new Billing(this.http)
        this.invoices = new Invoices(this.http)
        this.reports = new Reports(this.http)
        this.emissionPoints = new EmissionPoints(this.http)
        this.establishments = new Establishments(this.http)
        this.people = new People(this.http)
        this.batchBilling = new BatchBilling(this.http)
        this.taxes = new Taxes(this.http)
        this.orders = new Orders(this.http)
        this.tables = new Tables(this.http)
        this.categoryProducts = new CategoryProducts(this.http)
        this.products = new Products(this.http)
    }
}

export class LessaBillingClientSideSDK {

    public companies: Companies
    public companiesOnCompanies: CompaniesOnCompanies
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
    public orders: Orders
    public tables: Tables
    public categoryProducts: CategoryProducts
    public products: Products

    constructor(private readonly http: AxiosInstance) {

        this.companies = new Companies(this.http)
        this.companiesOnCompanies = new CompaniesOnCompanies(this.http)
        this.clients = new Clients(this.http)
        this.signatures = new Signatures(this.http)
        this.billing = new Billing(this.http)
        this.invoices = new Invoices(this.http)
        this.reports = new Reports(this.http)
        this.emissionPoints = new EmissionPoints(this.http)
        this.establishments = new Establishments(this.http)
        this.people = new People(this.http)
        this.batchBilling = new BatchBilling(this.http)
        this.taxes = new Taxes(this.http)
        this.orders = new Orders(this.http)
        this.orders = new Orders(this.http)
        this.tables = new Tables(this.http)
        this.categoryProducts = new CategoryProducts(this.http)
        this.products = new Products(this.http)

    }
}


export async function createLessaBrowserClientSDK(googleToken: string, config?: { environment?: LessaBillingEnvironment }) {

    const environmentConfig = !config?.environment
        ? environments.find(e => e.environment === "Test")
        : environments.find(e => e.environment === config?.environment)

    if (!environmentConfig) {
        throw new Error(`Invalid environment: ${config?.environment}`)
    }

    try {

        let lessaAccessToken = window.localStorage.getItem("lessa-access-token")

        if (!lessaAccessToken) {
            const instance = axios.create({
                baseURL: `${environmentConfig.url}/api`
            })

            const auth = new Auth(instance)

            const resp = await auth.loginGoogle(googleToken)

            window.localStorage.setItem("lessa-access-token", resp.accessToken)
            // const cookie = await window.cookieStore.get("lessa-access-token")
            lessaAccessToken = resp.accessToken
        }

        const instance = axios.create({
            baseURL: `${environmentConfig.url}/api`,
            headers: {
                "Authorization": `Bearer ${lessaAccessToken}`
            },

        })

        return new LessaBillingClientSideSDK(instance)

    } catch (error) {
        // await window.cookieStore.delete("lessa-access-token")
        return null
    }
}