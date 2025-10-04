export interface CategoryProduct {
    id: string;
    name: string;
    description: string;
    color: string;
    totalProductsInCategory: number;
}

export interface CategoryProductCreate extends Pick<CategoryProduct, "name" | "description" | "color"> {}
export interface CategoryProductUpdate extends Partial<Pick<CategoryProduct, "name" | "description" | "color">> {}
