export interface SalePrice {
    id: string;
    price: number;
    unitsForPrice: number;
    maxQuantity: number;
    minQuantity: number;
    isActive: boolean;
}

type SaleWithFields = Omit<SalePrice, 'id' | 'isActive'>;
export type SalePriceCreateInput = Pick<SalePrice, 'price' | 'unitsForPrice'> & Partial<Pick<SalePrice, 'maxQuantity' | 'minQuantity'>>;
export type SalePriceUpdateInput = Partial<SaleWithFields>;