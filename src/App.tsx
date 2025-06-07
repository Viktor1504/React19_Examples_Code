import { useReducer } from 'react'
import { todoReducer, User } from './todoReducer.ts'
import Users from './Users.tsx'
import AddUser from './AddUser.tsx'

const initialUsers: User[] = [
  { id: '1', name: 'John', age: 30, email: 'Xk9Yr@example.com', done: 'on' },
  { id: '2', name: 'Jane', age: 25, email: 'Tt9wO@example.com', done: null },
  { id: '3', name: 'Bob', age: 40, email: 'z4tHq@example.com', done: null },
]

const App = () => {
  const [users, dispatchUsers] = useReducer(todoReducer, initialUsers)
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <AddUser dispatch={dispatchUsers} />
        <Users dispatch={dispatchUsers} users={users} />
      </div>
    </div>
  )
}

export default App
