import axios, {AxiosResponse} from "axios";

export type User = {
    id: string;
    name: string;
    email: string;
};

export type ApiResponse = {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: User[];
};

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000"
});

export const api = {
    async getUsers(page: number, limit: number): Promise<AxiosResponse<ApiResponse>> {
        return await axiosInstance.get<ApiResponse>("/users", {
            params: {_page: page, _per_page: limit},
        });
    },
    async getUser(id: string) {
        const response = await axiosInstance.get<User>(`/users/${id}`)
        return response.data
    },

    async deleteUser(id: string): Promise<AxiosResponse<{ id: string }>> {
        return await axiosInstance.delete(`/users/${id}`);
    },

    async createUser(user: User): Promise<AxiosResponse<User>> {
        return await axiosInstance.post("/users", user);
    },
};