import { useSelector } from 'react-redux'
import { useAppDispatch, useTodosSelector } from './store.ts'
import { deleteTodoAC } from './todoReducer.ts'

const Users = () => {
  const dispatch = useAppDispatch()
  const todos = useSelector(useTodosSelector)

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Users</h1>
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos found.</p>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md border border-gray-200"
            >
              <div className="text-gray-700">
                <p className="font-medium">Title: {todo.title}</p>
                <p>Женат: {todo.married === 'on' ? 'Да' : 'Нет'}</p>
              </div>
              <button
                onClick={() => dispatch(deleteTodoAC(todo.id))}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
