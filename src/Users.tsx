import { useSelector } from 'react-redux'
import { selectTodos } from './selectors.ts'
import User from './User.tsx'

const Users = () => {
  const todos = useSelector(selectTodos)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Users</h1>
      {todos.length ? (
        <div className="space-y-4">
          {todos.map((todo) => (
            <User key={todo.id} todo={todo} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No todos found.</p>
      )}
    </div>
  )
}

export default Users
