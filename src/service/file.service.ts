import axios from 'axios'
import { API_URL } from '../lib/api_url'
import { IFileResponse } from '../interfaces/file.interface'

export const FileService = {
    async create(file: File, folder: string) {

        const formData = new FormData();
        formData.append("file", file);

        const {data} =  await axios.post<IFileResponse>(`${API_URL}/files/upload?folder=${folder}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return data.fileName
    },
};
