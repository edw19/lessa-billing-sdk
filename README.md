# Lessa Billing SDK

[![npm version](https://badge.fury.io/js/lessa-billing-sdk.svg)](https://badge.fury.io/js/lessa-billing-sdk)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

SDK oficial para la API de facturación electrónica de Lessa Billing. Simplifica la integración con el sistema de facturación electrónica ecuatoriano, proporcionando una interfaz TypeScript/JavaScript fácil de usar.

## 🚀 Características

- ✅ **Facturación electrónica completa** - Emisión, firma y envío de facturas
- ✅ **Facturación por lotes** - Procesamiento masivo de facturas
- ✅ **Gestión de compañías y clientes** - CRUD completo
- ✅ **Firmas electrónicas** - Gestión de certificados digitales
- ✅ **Reportes y PDFs** - Generación de documentos
- ✅ **Validaciones ecuatorianas** - RUC, cédula, secuenciales
- ✅ **TypeScript nativo** - Tipado completo y autocompletado
- ✅ **Múltiples ambientes** - Producción, pruebas y desarrollo

## 📦 Instalación

```bash
npm install lessa-billing-sdk
```

```bash
yarn add lessa-billing-sdk
```

```bash
pnpm add lessa-billing-sdk
```

## 🔧 Configuración

### Inicialización básica

```typescript
import { LessaBillingSDK } from "lessa-billing-sdk";

// Ambiente de pruebas (por defecto)
const sdk = new LessaBillingSDK("TU_API_KEY");

// Ambiente específico
const sdk = new LessaBillingSDK("TU_API_KEY", {
  environment: "Production", // 'Production' | 'Test' | 'Development'
});
```

### Ambientes disponibles

| Ambiente      | Descripción           | URL                                                 |
| ------------- | --------------------- | --------------------------------------------------- |
| `Test`        | Pruebas (por defecto) | https://lessa-billing-api-preview.up.railway.app    |
| `Production`  | Producción            | https://lessa-billing-api-production.up.railway.app |
| `Development` | Desarrollo local      | http://localhost:5000                               |

## 📖 Guía de uso

### Facturación simple

```typescript
import {
  LessaBillingSDK,
  PAYMENT_METHOD_WITHOUT_USING_FINANCIAL_SYSTEM,
} from "lessa-billing-sdk";

const sdk = new LessaBillingSDK("TU_API_KEY", { environment: "Test" });

const invoiceData = {
  clientOnCompanyId: "0401869691_0401869691001",
  paymentMethodCode: PAYMENT_METHOD_WITHOUT_USING_FINANCIAL_SYSTEM.code,
  details: [
    {
      code: "001",
      stubCode: "A001",
      description: "Producto o servicio",
      discount: 0,
      quantity: 1,
      unitPrice: 100,
      taxes: ["iva:15"],
      AdditionalDetails: [
        { name: "Detalle extra", value: "Información adicional" },
      ],
    },
  ],
};

try {
  const invoice = await sdk.billing.invoice(
    "ruc_empresa",
    "codigo_establecimiento",
    "punto_emision",
    invoiceData
  );
  console.log("Factura creada:", invoice);
} catch (error) {
  console.error("Error al facturar:", error);
}
```

### Gestión de compañías

```typescript
// Obtener compañías de un usuario
const companies = await sdk.companies.getUserCompanies("userId");

// Obtener información de una compañía
const company = await sdk.companies.getCompany("1234567890001");

// Crear nueva compañía
const newCompany = await sdk.companies.createCompany({
  ruc: "1234567890001",
  businessName: "Mi Empresa S.A.",
  // ... otros campos
});
```

### Gestión de clientes

```typescript
// Buscar cliente
const client = await sdk.clients.findClient("0401869691", "1234567890001");

// Actualizar cliente
await sdk.clients.updateClient("0401869691", "1234567890001", {
  name: "Nuevo nombre",
  email: "nuevo@email.com",
});

// Obtener créditos de cliente
const credits = await sdk.clients.getCredits("0401869691", "1234567890001");
```

### Facturación por lotes

```typescript
const batchData = [
  // Array de facturas
  invoiceData1,
  invoiceData2,
  // ...
];

// Generar lote
const batch = await sdk.batchBilling.generateBatch(
  "ruc",
  "establecimiento",
  "punto_emision",
  batchData
);

// Firmar lote
await sdk.batchBilling.signBatch(batch.billingProcessId);

// Enviar lote
await sdk.batchBilling.sendBatch(batch.billingProcessId);

// Verificar estado
const status = await sdk.batchBilling.checkBatch(batch.billingProcessId);
```

## 🛠️ Recursos disponibles

El SDK proporciona acceso a los siguientes recursos:

- `sdk.companies` - Gestión de compañías
- `sdk.clients` - Gestión de clientes
- `sdk.billing` - Facturación individual
- `sdk.batchBilling` - Facturación por lotes
- `sdk.signatures` - Gestión de firmas electrónicas
- `sdk.invoices` - Consulta de facturas
- `sdk.reports` - Generación de reportes y PDFs
- `sdk.people` - Validación de personas
- `sdk.establishments` - Gestión de establecimientos
- `sdk.emissionPoints` - Gestión de puntos de emisión
- `sdk.taxes` - Consulta de impuestos

## 🔍 Utilidades incluidas

El SDK incluye utilidades para validación de datos ecuatorianos:

```typescript
import {
  validateRuc,
  validateCedula,
  generateAccessKey,
  calculateInvoiceTotals,
} from "lessa-billing-sdk";

// Validar RUC
const isValidRuc = validateRuc("1234567890001");

// Validar cédula
const isValidCedula = validateCedula("0401869691");

// Generar clave de acceso
const accessKey = generateAccessKey({
  issueDate: new Date(),
  receiptType: "01",
  ruc: "1234567890001",
  environment: "1",
  establishment: "001",
  emissionPoint: "001",
  sequential: "000000001",
  numericCode: "12345678",
});
```

## 📚 Constantes predefinidas

```typescript
import {
  PAYMENT_METHOD_WITHOUT_USING_FINANCIAL_SYSTEM,
  IVA_TAX_CODE,
  IVA_PERCENTAGE_CODE_15,
  IVA_FEE_CODE_15,
} from "lessa-billing-sdk";
```

## 🐛 Manejo de errores

```typescript
try {
  const result = await sdk.billing.invoice(ruc, establishment, point, data);
} catch (error) {
  if (error.response) {
    // Error de la API
    console.error("Error de API:", error.response.data);
  } else if (error.request) {
    // Error de red
    console.error("Error de conexión:", error.message);
  } else {
    // Otro error
    console.error("Error:", error.message);
  }
}
```

## 📄 Licencia

ISC License - ver [LICENSE](LICENSE) para más detalles.

## 🤝 Soporte

Para soporte técnico o consultas:

- **Autor**: edwindev
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/lessa-billing-sdk/issues)

## 🔄 Changelog

### v0.0.46

- Versión actual estable
- Soporte completo para facturación electrónica ecuatoriana

## Endpoints

### Batch Billing

- `POST /billing/batch/invoices/generate/{ruc}/{establishmentCode}/{emissionPointCode}`: Generate a batch of invoices.
- `POST /billing/batch/invoices/sign/{billingProcessId}`: Sign a batch of invoices.
- `POST /billing/batch/invoices/send/{billingProcessId}`: Send a batch of invoices.
- `POST /billing/batch/invoices/check/{billingProcessId}`: Check the authorization status of a batch of invoices.
- `POST /billing/batch/invoices/{ruc}/{establishmentCode}/{emissionPointCode}`: Send a batch of invoices with a timeout of 0.

### Billing

- `POST /billing/invoice/{ruc}/{establishmentCode}/{emissionPointCode}`: Create an invoice.
- `POST /billing/invoice/generate/{ruc}/{establishmentCode}/{emissionPoint}`: Generate an invoice.
- `POST /billing/invoice/sign/{accessKey}`: Sign an invoice.
- `POST /billing/invoice/send/{accessKey}`: Send an invoice.
- `POST /billing/invoice/check/{accessKey}`: Check the authorization status of an invoice.

### Clients

- `GET /clients/find/{identificationID}/{rucID}`: Find a client in a company.
- `PATCH /clients/update/{currentIdentificationID}/{rucID}`: Update a client's information.
- `GET /credits/{identificationID}/{rucID}`: Get a client's credits.
- `POST /credits/create/{identificationID}/{rucID}`: Create a credit for a client.
- `GET /paymentsHistory/find/{creditID}`: Get the payment history for a credit.
- `POST /paymentHistory/create/{identificationID}/{rucID}`: Create a payment for a client.

### Companies

- `POST /companies/create`: Create a new company.
- `GET /companies/{ruc}`: Get a company by its RUC.
- `PATCH /companies/{ruc}`: Update a company's information.
- `GET /companies/clients/{ruc}`: Get a company's clients.
- `GET /companies/clients/mapped/{ruc}`: Get a company's clients in a mapped format.
- `GET /companies/clients/count/{ruc}`: Count a company's clients.
- `POST /companies/{ruc}/create-person-relation`: Create a person-company relationship.
- `GET /companies/user/{userId}`: Get the companies associated with a user.
- `GET /companies/billing-status/{ruc}`: Get the billing status of a company.
- `POST /companies/create-relation/{rucProvider}/{rucClient}`: Create a relationship between two companies.
- `PATCH /companies/update-relation/{rucProvider}/{rucClient}`: Update a relationship between two companies.
- `GET /companies/is-registered/{ruc}`: Check if a company is registered.
- `GET /companies/{ruc}/establishments-and-emission-points`: Get a company's establishments and emission points.
- `GET /companies/{userId}/companies-establishments-and-emission-points`: Get the establishments and emission points of the companies associated with a user.

### Emission Points

- `GET /emission-points/establishment/{establishmentId}`: Get the emission points of an establishment.
- `GET /emission-points/find-one/{ruc}/{establishmentCode}/{emissionPoint}`: Get a specific emission point.
- `GET /emission-points/find/{ruc}/{establishmentCode}`: Get the emission points of an establishment.
- `PATCH /emission-points/{emissionPointId}`: Update an emission point.

### Establishments

- `GET /establishments/company/{ruc}`: Get the establishments of a company.

### Invoices

- `GET /invoices/association/{clientOnCompanyId}`: Get invoices by association ID.
- `GET /invoices/company/{ruc}`: Get invoices by company RUC.
- `GET /invoices/clientOnCompany/{identificationID}/{rucID}`: Get invoices by client and company.

### People

- `GET /people/find/{identification}`: Find a person by their identification.
- `GET /people/validate/{identification}`: Validate a person's identification.

### Reports

- `GET /reports/bill/{accessKey}`: Get an invoice PDF.

### Signatures

- `GET /signatures/company/{ruc}`: Get the signatures of a company.
- `PATCH /signatures/update/{ruc}/{id}`: Update a signature.
- `POST /signatures/create/{ruc}`: Create a signature.
- `PATCH /signatures/select/{id}`: Select a signature.

### Taxes

- `GET /taxes`: Get a list of taxes.
