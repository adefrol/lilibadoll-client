export interface IOrder {
    order_id?: number;
    name: string;
    type_order: string;
    last_name:string;
    email:string;
    phone: string;
    address: string;
    image?: string;
    message: string;
    created_at?: string;
}

export interface IOrderPost {
    data: IOrder;
    status: number;
}