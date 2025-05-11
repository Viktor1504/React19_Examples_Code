import { useState } from 'react'

export type UserType = {
  id: string
  name: string
  age: number
}

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([
    { id: '1', name: 'John', age: 30 },
    { id: '2', name: 'Jane', age: 25 },
    { id: '3', name: 'Jane', age: 25 },
    { id: '43', name: 'Victor', age: 30 },
  ])

  return { users, setUsers }
}
