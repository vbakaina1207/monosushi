import { ICategoryResponse } from "../category/category.interface";
import { ITypeProductResponse } from "../type-product/type-product.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    type_product: ITypeProductResponse;
    name: string;
    path: string;
    ingredients: string;
    weight: string;
    price: number;
    price_old:number;
    imagePath: string;
    count: number
}

export interface IProductResponse extends IProductRequest {
    id: number;
}