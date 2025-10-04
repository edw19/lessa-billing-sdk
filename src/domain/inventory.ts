export interface FindInventory {
    warehousesIDs: string;

    categoryProductsIDs?: string;

    productMainCode?: string;

    productName?: string;


    take?: number;

    skip?: number;
}


export interface InventoryFindResponse {
    items: Item[];
    pagination: Pagination;
}

interface Pagination {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemsPerPage: number;
    totalProducts: number;
    currentPageStart: number;
    currentPageEnd: number;
}

interface Item {
    establishment: Establishment;
    warehouse: Warehouse;
    inventorty: Inventorty;
    product: Product;
    categories: Category[];
    purcharsePrice: number;
    salePrices: SalePrice[];
    taxes: { id: string, name: string, value: string }[]
}

interface Category {
    id: string;
    name: string;
    description: string;
    color: string;
}

interface Product {
    id: string;
    type: string;
    code: string;
    name: string;
    iva: Iva;
}

interface Iva {
    label: string;
    value: number;
}

interface Inventorty {
    id: string;
    dateExpiration: null;
    units: number;
    balance: number;
    minStock: number;
    maxStock: number;
}

interface Warehouse {
    id: string;
    name: string;
}

interface Establishment {
    id: string;
    code: number;
    codeLabel: string;
    name: string;
}

interface SalePrice {
    id: string;
    price: number;
    unitsForPrice: number;
    minQuantity: number;
    maxQuantity: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    productId: string;
}