import axios, { AxiosResponse } from 'axios'

export type User = {
  id: string
  name: string
  age: string
}

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
})

const API = {
  async fetchUsers(): Promise<AxiosResponse<User[]>> {
    return instance.get('users')
  },
  getUser(id: string): Promise<AxiosResponse<User>> {
    return instance.get(`users/${id}`)
  },
  deleteUser(id: string) {
    return instance.delete(`users/${id}`)
  },
  addUser(user: User) {
    return instance.post('users', user)
  },
  updateUser(user: User) {
    return instance.put(`users/${user.id}`, user)
  },
  searchUsers(name: string): Promise<AxiosResponse<User[]>> {
    return instance.get(`users?name_like=${name}`)
  },
}

export default API
