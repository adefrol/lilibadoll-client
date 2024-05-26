import axios from "axios";
import { IOrder } from "../interfaces/order.interface";
import { API_URL } from "../lib/api_url";
import { FileService } from './file.service'

export const OrderService = {
    async create(orderData: IOrder, folder?: string, file?: File ) {
        let fileName: string = "";
        if(file && folder) {
            fileName = await FileService.create(file, folder)
        }
        const { data } = await axios.post(
            `${API_URL}/order`,
            JSON.stringify({ ...orderData, image: file ? fileName : "" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return data
    },
    async getOrders() {
        const { data } = await axios.get(`${API_URL}/order`);
        return data;
    }
};
