import axios from "axios";

export type User = {
    id: string;
    name: string;
    email: string;
}

const instance = axios.create({
    baseURL: 'http://localhost:3001'
})

export const api = {
    async getUsers(): Promise<User[]> {
        const res = await instance.get<User[]>('/users')
        return res.data
    },
    async getUser(id: string): Promise<User> {
        const res = await instance.get<User>(`/users/${id}`)
        return res.data
    },
    async createUser(user: User): Promise<User> {
        const res = await instance.post<User>('/users', user)
        return res.data
    },
    async deleteUser(id: string): Promise<User> {
        const res = await instance.delete<User>(`/users/${id}`)
        return res.data
    },
}