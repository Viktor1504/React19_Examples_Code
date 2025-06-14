import { deleteTodoAC, Todo, updateTodoAC } from './todoReducer.ts'
import { useAppDispatch } from './store.ts'

const User = ({ todo }: { todo: Todo }) => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-md border border-gray-200">
      <div className="text-gray-700">
        <p className="font-medium">Title: {todo.title}</p>
        <p>Женат: {todo.married ? 'Да' : 'Нет'}</p>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor={`done-${todo.id}`}>Done</label>
        <input
          id={`done-${todo.id}`}
          type={'checkbox'}
          checked={todo.done}
          onChange={() => dispatch(updateTodoAC(todo.id, { done: !todo.done }))}
        />
      </div>
      <button
        onClick={() => dispatch(deleteTodoAC(todo.id))}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
  )
}

export default User
