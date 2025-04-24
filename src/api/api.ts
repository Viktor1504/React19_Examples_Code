export type User = {
    id: string;
    name: string;
    email: string;
}

export const api = {

    async getUsers() {
        return await fetch('http://localhost:3001/users').then(res => res.json())
    },

    async getUser(id: string) {
        await fetch(`http://localhost:3001/users${id}`)
    },
    async createUser(user: User) {
        await fetch(`http://localhost:3001/users`, {
            method: 'POST', body: JSON.stringify(user)
        })
    },
    async deleteUser(id: string) {
        await fetch(`http://localhost:3001/users${id}`, {method: 'DELETE'})
    },
}