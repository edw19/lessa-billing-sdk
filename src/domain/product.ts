import { CategoryProduct } from "./category-product";
import { SalePrice } from "./sale-price";
import { Tax } from "./tax";

export interface Product {
    id: string;
    mainCode: string;
    auxiliaryCode: string;
    name: string;
    description: string;
    taxes: Tax[];
    categories: CategoryProduct[];
    salePrices: SalePrice[];
    rucID: string;
    images: any[] | null;
}


export interface CreateProductOnCompany {
    warehousesIDs: string[];
    categoriesToAddIDs?: string[];
    type: string
    mainCode: string;
    auxiliaryCode: string;
    name: string;
    description: string;
    quantity: number;
    taxes: string[];
    salePrice: number
}