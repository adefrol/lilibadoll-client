export interface IDiscount {
    id: number;
    name: string;
    discount_value: number;
    expired_at: string;
    type: DiscountTypes;
    target: number
}

export type DiscountTypes = "one" | "category";

export interface INewDiscount {
    name?: string;
    discount_value?: number;
    expired_at?: string;
    type?: DiscountTypes;
    target?: number
}
