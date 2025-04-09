import axios from "axios";

export type User = {
    id: string;
    name: string;
    email: string;
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 5000,
})

export const api = {
    async getUsers(page: number, limit: number) {
        const response = await axiosInstance.get<User[]>("/users", {
            params: {_page: page, _per_page: limit},
        })
        return response.data
    },

    async deleteUser(id: string) {
        await axiosInstance.delete(`/users/${id}`);
    },

    async createUser(user: User) {
        await axiosInstance.post("/users", user);
    },
}
