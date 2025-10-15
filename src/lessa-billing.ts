import axios, { AxiosInstance } from "axios";
import {
    Companies,
    Clients,
    Signatures,
    Billing,
    Invoices,
    Reports,
    People,
    Establishments,
    EmissionPoints,
    BatchBilling,
    Taxes,
    CompaniesOnCompanies,
    Orders,
    Tables,
    CategoryProducts,
    Products,
    Inventory,
    Warehouses,
    Auth,
} from "./resources";

type LessaBillingEnvironment = "Production" | "Test" | "Development" | (string & {});

const environments = [
    { environment: "Production", url: "https://lessa-billing-api-production.up.railway.app" },
    { environment: "Test", url: "https://lessa-billing-api-preview.up.railway.app" },
    { environment: "Development", url: "http://localhost:5000" },
] as const;

function getEnvironmentConfig(env?: LessaBillingEnvironment) {
    return environments.find(e => e.environment === (env ?? "Test"));
}

/* -------------------------------------------------------------------------- */
/*                             BASE SDK                                       */
/* -------------------------------------------------------------------------- */

abstract class LessaBillingBaseSDK {
    protected http: AxiosInstance;

    public companies: Companies;
    public companiesOnCompanies: CompaniesOnCompanies;
    public clients: Clients;
    public signatures: Signatures;
    public billing: Billing;
    public invoices: Invoices;
    public reports: Reports;
    public emissionPoints: EmissionPoints;
    public establishments: Establishments;
    public people: People;
    public batchBilling: BatchBilling;
    public taxes: Taxes;
    public orders: Orders;
    public tables: Tables;
    public categoryProducts: CategoryProducts;
    public products: Products;
    public inventory: Inventory;
    public warehouses: Warehouses;

    constructor(http: AxiosInstance) {
        this.http = http;

        this.companies = new Companies(http);
        this.companiesOnCompanies = new CompaniesOnCompanies(http);
        this.clients = new Clients(http);
        this.signatures = new Signatures(http);
        this.billing = new Billing(http);
        this.invoices = new Invoices(http);
        this.reports = new Reports(http);
        this.emissionPoints = new EmissionPoints(http);
        this.establishments = new Establishments(http);
        this.people = new People(http);
        this.batchBilling = new BatchBilling(http);
        this.taxes = new Taxes(http);
        this.orders = new Orders(http);
        this.tables = new Tables(http);
        this.categoryProducts = new CategoryProducts(http);
        this.products = new Products(http);
        this.inventory = new Inventory(http);
        this.warehouses = new Warehouses(http);
    }
}

/* -------------------------------------------------------------------------- */
/*                             SERVER-SIDE SDK                                */
/* -------------------------------------------------------------------------- */

export class LessaBillingSDK extends LessaBillingBaseSDK {
    constructor(API_KEY: string, config?: { environment?: LessaBillingEnvironment }) {
        const envConfig = getEnvironmentConfig(config?.environment);
        if (!envConfig) throw new Error(`Invalid environment: ${config?.environment}`);

        const http = axios.create({
            baseURL: `${envConfig.url}/api`,
            headers: { "x-lessa-api-key": API_KEY },
        });

        super(http);
    }
}

/* -------------------------------------------------------------------------- */
/*                             CLIENT-SIDE SDK                                */
/* -------------------------------------------------------------------------- */

export class LessaBillingClientSideSDK extends LessaBillingBaseSDK {
    constructor(http: AxiosInstance) {
        super(http);
    }
}

/* -------------------------------------------------------------------------- */
/*                           BROWSER CLIENT CREATOR                           */
/* -------------------------------------------------------------------------- */

export async function createLessaBrowserClientSDK(
    googleToken: string,
    config?: { environment?: LessaBillingEnvironment }
) {
    const envConfig = getEnvironmentConfig(config?.environment);

    if (!envConfig) throw new Error(`Invalid environment: ${config?.environment}`);

    try {
        let accessToken = localStorage.getItem("lessa-access-token");

        if (!accessToken) {
            const instance = axios.create({ baseURL: `${envConfig.url}/api` });
            const auth = new Auth(instance);
            const resp = await auth.loginGoogle(googleToken);

            localStorage.setItem("lessa-access-token", resp.accessToken);
            localStorage.setItem("lessa-refresh-token", resp.refreshToken);
            accessToken = resp.accessToken;
        }

        const http = axios.create({
            baseURL: `${envConfig.url}/api`,
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Interceptor para refrescar tokens automáticamente
        http.interceptors.response.use(
            (res) => res,
            async (err) => {
                const original = err.config;
                if (err.response?.status === 401 && !original._retry) {
                    original._retry = true;
                    try {
                        const newAccessToken = await refreshAccessToken(envConfig.url);
                        http.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                        original.headers.Authorization = `Bearer ${newAccessToken}`;
                        return http(original);
                    } catch (refreshError) {
                        localStorage.removeItem("lessa-access-token");
                        localStorage.removeItem("lessa-refresh-token");
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(err);
            }
        );

        return new LessaBillingClientSideSDK(http);
    } catch (error) {
        return null;
    }
}

/* -------------------------------------------------------------------------- */
/*                             REFRESH ACCESS TOKEN                           */
/* -------------------------------------------------------------------------- */

async function refreshAccessToken(environmentUrl: string) {
    const refreshToken = localStorage.getItem("lessa-refresh-token");
    if (!refreshToken) throw new Error("No refresh token found");

    const { data } = await axios.post(`${environmentUrl}/api/auth/refresh`, { refreshToken });
    localStorage.setItem("lessa-access-token", data.accessToken);

    return data.accessToken;
}
