import axios, {AxiosResponse} from "axios";

export type User = {
    id: string;
    name: string;
    email: string;
};

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
});

export const api = {
    async getUsers(page: number, limit: number) {
        return axiosInstance.get<AxiosResponse<User[]>>("/users", {
            params: {_page: page, _per_page: limit},
        });
    },

    async deleteUser(id: string) {
        return axiosInstance.delete(`/users/${id}`);
    },
};