import { IUserChangePass } from "@/interfaces/user.interface";
import { API_URL } from "@/lib/api_url";
import axios, { AxiosError } from "axios";
import { UserService } from "./user.service";

export async function changePassword(changePass: IUserChangePass) {
    try {
        const data = await axios.post(
            `${API_URL}/auth/change-pass`,
            changePass,
            {
                headers: { Authorization: `Bearer ${UserService.getToken()}` },
            }
        );

        return data.status;
    } catch (e) {
        const error = e as AxiosError;
        return Number(error.response?.status);
    }
}
