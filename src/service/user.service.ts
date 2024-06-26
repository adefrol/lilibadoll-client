import {
    IUser,
    IUserPurchases,
} from "@/interfaces/user.interface";
import { API_URL } from "@/lib/api_url";
import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.headers.common["ngrok-skip-browser-warning"] = "69420";

export const UserService = {
    

    async register(regData: IUser) {
        try {
            const data = await axios.post(
                `${API_URL}/auth/register`,
                JSON.stringify(regData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(data);

            return data.status;
        } catch (e) {
            const error = e as AxiosError;
            console.log(error);
            return Number(error.response?.status);
        }
    },

    async verifyEmail(email: string, code: string) {
        try {
            const { data } = await axios.post(
                `${API_URL}/auth/verify?email=${email}&code=${code}`
            );
            console.log(data);

            if (data.status == 200) {
                return 200;
            }
        } catch (e) {
            const error = e as AxiosError;
            if (error.response?.status == 400) {
                return 400;
            }
            if (error.response?.status == 418) {
                return 418;
            }
        }
    },

    async update(editData: IUser) {
        try {
            const data = await axios.post(`${API_URL}/auth/edit`, editData, {
                headers: {
                    Authorization: `Bearer ${this.getToken()}`,
                },
            });

            return data.status;
        } catch (e) {
            const error = e as AxiosError;
            return { status: Number(error.response?.status) };
        }
    },

    async login(loginData: IUser) {
        try {
            const { data } = await axios.post(
                `${API_URL}/auth/login`,
                JSON.stringify(loginData),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            this.setToken(data.access_token);
            return data;
        } catch (e) {
            const error = e as AxiosError;
            return { status: Number(error.response?.status) };
        }
    },
    async isLogged() {
        try {
            const data = await axios.get<AxiosResponse>(
                `${API_URL}/auth/isLogin`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getToken()}`,
                    },
                }
            );
            if (data.status == 200) {
                console.log("TRUE!!");

                return true;
            }
        } catch {
            console.log("false!!");

            return false;
        }
    },

    async isAdmin() {
        try {
            const data = await axios.get<AxiosResponse>(
                `${API_URL}/auth/admin`,
                {
                    headers: {
                        Authorization: `Bearer ${this.getToken()}`,
                    },
                }
            );
            if (data.status == 200) {
                return true;
            }
        } catch (e) {
            return false;
        }
    },

    deleteToken() {
        return localStorage.removeItem("token");
    },

    getToken() {
        try {
            return localStorage.getItem("token");
        } catch {
            return null;
        }
    },

    setToken(token: string) {
        try {
            localStorage.setItem("token", token);
            return true;
        } catch {
            return false;
        }
    },

    async getProfile() {
        const { data } = await axios.get<IUser>(`${API_URL}/auth/profile`, {
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
        });
        return data;
    },

    async getPurchases() {
        const { data } = await axios.get<IUserPurchases>(
            `${API_URL}/auth/purchases`,
            {
                headers: {
                    Authorization: `Bearer ${this.getToken()}`,
                },
            }
        );
        return data;
    },
};
