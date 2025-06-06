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
const sdk = new LessaBillingSDK('Test');

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
      taxes: [
        {
          code: IVA_TAX_CODE,
          percentageCode: IVA_PERCENTAGE_CODE_15,
          fee: IVA_FEE_CODE_15
        }
      ],
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
