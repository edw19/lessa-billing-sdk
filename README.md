# lessa-billing-sdk

SDK oficial para Lessa Billing API

## Descripción
Este SDK permite interactuar de forma sencilla con la API de facturación electrónica de Lessa Billing. Proporciona utilidades para la gestión de compañías, clientes, facturación, firmas electrónicas, puntos de emisión, reportes y más.

## Instalación

```
npm install lessa-billing-sdk
```

## Uso Básico

```typescript
import { LessaBillingSDK, PAYMENT_METHOD_WITHOUT_USING_FINANCIAL_SYSTEM, IVA_TAX_CODE, IVA_PERCENTAGE_CODE_15, IVA_FEE_CODE_15 } from 'lessa-billing-sdk';

// Inicializar el SDK (ambientes disponibles: 'Production', 'Test')
const sdk = new LessaBillingSDK('<API_KEY>', { environment: 'Test' });

// Ejemplo: Obtener compañías de un usuario
const companies = await sdk.companies.getUserCompanies('userId');

// Ejemplo: facturar un venta

const invoiceData = {
  clientOnCompanyId: '0401869691_0401869691001',
  paymentMethodCode: PAYMENT_METHOD_WITHOUT_USING_FINANCIAL_SYSTEM.code,
  details: [
    {
      code: '001',
      stubCode: 'A001',
      description: 'Producto o servicio',
      discount: 0,
      quantity: 1,
      unitPrice: 100,
      taxes: ["iva:15"],
      AdditionalDetails: [
        { name: 'Detalle extra', value: 'Valor' }
      ]
    }
  ],
};


const invoice = await sdk.billing.invoice(ruc, establishmentCode, emissionPoint, invoiceData);
```

## Funcionalidades Principales
- Gestión de compañías y clientes
- Emisión y envío de facturas electrónicas
- Facturación por lotes
- Gestión de firmas electrónicas
- Consulta de reportes y PDFs
- Utilidades para validación de RUC, cédula, secuenciales, etc.


## Ejemplo de Inicialización
```typescript
import { LessaBillingSDK } from 'lessa-billing-sdk';
const sdk = new LessaBillingSDK('Production');
```

## Contacto
Para soporte o dudas, contacta a: edwindev

## Endpoints

### Batch Billing

-   `POST /billing/batch/invoices/generate/{ruc}/{establishmentCode}/{emissionPointCode}`: Generate a batch of invoices.
-   `POST /billing/batch/invoices/sign/{billingProcessId}`: Sign a batch of invoices.
-   `POST /billing/batch/invoices/send/{billingProcessId}`: Send a batch of invoices.
-   `POST /billing/batch/invoices/check/{billingProcessId}`: Check the authorization status of a batch of invoices.
-   `POST /billing/batch/invoices/{ruc}/{establishmentCode}/{emissionPointCode}`: Send a batch of invoices with a timeout of 0.

### Billing

-   `POST /billing/invoice/{ruc}/{establishmentCode}/{emissionPointCode}`: Create an invoice.
-   `POST /billing/invoice/generate/{ruc}/{establishmentCode}/{emissionPoint}`: Generate an invoice.
-   `POST /billing/invoice/sign/{accessKey}`: Sign an invoice.
-   `POST /billing/invoice/send/{accessKey}`: Send an invoice.
-   `POST /billing/invoice/check/{accessKey}`: Check the authorization status of an invoice.

### Clients

-   `GET /clients/find/{identificationID}/{rucID}`: Find a client in a company.
-   `PATCH /clients/update/{currentIdentificationID}/{rucID}`: Update a client's information.
-   `GET /credits/{identificationID}/{rucID}`: Get a client's credits.
-   `POST /credits/create/{identificationID}/{rucID}`: Create a credit for a client.
-   `GET /paymentsHistory/find/{creditID}`: Get the payment history for a credit.
-   `POST /paymentHistory/create/{identificationID}/{rucID}`: Create a payment for a client.

### Companies

-   `POST /companies/create`: Create a new company.
-   `GET /companies/{ruc}`: Get a company by its RUC.
-   `PATCH /companies/{ruc}`: Update a company's information.
-   `GET /companies/clients/{ruc}`: Get a company's clients.
-   `GET /companies/clients/mapped/{ruc}`: Get a company's clients in a mapped format.
-   `GET /companies/clients/count/{ruc}`: Count a company's clients.
-   `POST /companies/{ruc}/create-person-relation`: Create a person-company relationship.
-   `GET /companies/user/{userId}`: Get the companies associated with a user.
-   `GET /companies/billing-status/{ruc}`: Get the billing status of a company.
-   `POST /companies/create-relation/{rucProvider}/{rucClient}`: Create a relationship between two companies.
-   `PATCH /companies/update-relation/{rucProvider}/{rucClient}`: Update a relationship between two companies.
-   `GET /companies/is-registered/{ruc}`: Check if a company is registered.
-   `GET /companies/{ruc}/establishments-and-emission-points`: Get a company's establishments and emission points.
-   `GET /companies/{userId}/companies-establishments-and-emission-points`: Get the establishments and emission points of the companies associated with a user.

### Emission Points

-   `GET /emission-points/establishment/{establishmentId}`: Get the emission points of an establishment.
-   `GET /emission-points/find-one/{ruc}/{establishmentCode}/{emissionPoint}`: Get a specific emission point.
-   `GET /emission-points/find/{ruc}/{establishmentCode}`: Get the emission points of an establishment.
-   `PATCH /emission-points/{emissionPointId}`: Update an emission point.

### Establishments

-   `GET /establishments/company/{ruc}`: Get the establishments of a company.

### Invoices

-   `GET /invoices/association/{clientOnCompanyId}`: Get invoices by association ID.
-   `GET /invoices/company/{ruc}`: Get invoices by company RUC.
-   `GET /invoices/clientOnCompany/{identificationID}/{rucID}`: Get invoices by client and company.

### People

-   `GET /people/find/{identification}`: Find a person by their identification.
-   `GET /people/validate/{identification}`: Validate a person's identification.

### Reports

-   `GET /reports/bill/{accessKey}`: Get an invoice PDF.

### Signatures

-   `GET /signatures/company/{ruc}`: Get the signatures of a company.
-   `PATCH /signatures/update/{ruc}/{id}`: Update a signature.
-   `POST /signatures/create/{ruc}`: Create a signature.
-   `PATCH /signatures/select/{id}`: Select a signature.

### Taxes

-   `GET /taxes`: Get a list of taxes.
