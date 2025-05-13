import axios, { AxiosResponse } from 'axios'

export type User = {
  id: string
  name: string
  age: number
}

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
})

const API = {
  async getUsers(): Promise<AxiosResponse<User[]>> {
    return instance.get('users')
  },
  getUser(id: string): Promise<AxiosResponse<User>> {
    return instance.get(`users/${id}`)
  },
  deleteUser(id: string) {
    return instance.delete(`users/${id}`)
  },
  createUser(user: User) {
    return instance.post('users', user)
  },
}

export default API
