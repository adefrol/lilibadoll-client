import axios from "axios";
import { API_URL } from "../lib/api_url";
import { FileService } from "./file.service";
import { IProduct, IProductCreate } from "../interfaces/product.interface";

axios.defaults.headers.common['ngrok-skip-browser-warning'] = '69420'

export const ProductService = {
    async create(orderData: IProductCreate, folder?: string, file?: File) {
        let fileName: string = "";
        if (file && folder) {
            fileName = await FileService.create(file, folder);
        }
        const { data } = await axios.post(
            `${API_URL}/product`,
            JSON.stringify({ ...orderData, image: file ? fileName : "" }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    },
    async getAll() {
        const { data } = await axios.get<IProduct[]>(`${API_URL}/product`);
        return data;
    },
    async getById(id: string) {
        const { data } = await axios.get(`${API_URL}/product/${id}`);
        return data;
    },

    async update(
        productData: IProduct,
        folder?: string,
        file?: File
    ) {
        let fileName: string = "";
        if (file && folder) {
            fileName = await FileService.create(file, folder);
        }
        const { data } = await axios.patch(
            `${API_URL}/product`,
            JSON.stringify({
                ...productData,
                image: file ? fileName : productData.image,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return data;
    },

    async delete(id: number) {
        const { data } = await axios.delete(`${API_URL}/product/${id}`);
        return data;
    },
};
