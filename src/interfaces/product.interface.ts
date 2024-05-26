import { ICategory } from './category.interface'
import { IDiscount } from './discount.interface'

export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: ICategory
    discount: IDiscount
}

export interface IProductCreate {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    category?: number
}

/* export interface IProductResponse {
    data: IProduct;
    status: number
} */