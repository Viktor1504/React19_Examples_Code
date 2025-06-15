import { deleteTodoAC, Todo, updateTodoAC } from './reducers/todoReducer.ts'
import { useAppDispatch } from './store.ts'
import { useState } from 'react'

const User = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [married, setMarried] = useState(todo.married)

  const dispatch = useAppDispatch()
  const handleSave = () => {
    if (title.trim()) {
      dispatch(updateTodoAC(todo.id, { title: title.trim(), married }))
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setTitle(todo.title)
    setMarried(todo.married)
    setIsEditing(false)
  }

  const handleDelete = () => {
    dispatch(deleteTodoAC(todo.id))
  }

  const toggleDone = () => {
    dispatch(updateTodoAC(todo.id, { done: !todo.done }))
  }

  return (
    <div
      className={`p-4 rounded-lg border ${todo.done ? 'bg-green-50' : 'bg-white'}`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите имя..."
            className="w-full px-3 py-2 border rounded"
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={married}
              onChange={(e) => setMarried(e.target.checked)}
            />
            <span>В браке</span>
          </label>

          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <div onDoubleClick={() => setIsEditing(true)}>
          <h3 className={todo.done ? 'line-through text-gray-500' : ''}>
            {todo.title}
          </h3>
          <p>
            Семейное положение:{' '}
            {todo.married ? 'В браке' : 'Не женат/не замужем'}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={todo.done} onChange={toggleDone} />
          <span>{todo.done ? 'Завершено' : 'В работе'}</span>
        </label>

        <button
          onClick={handleDelete}
          className="px-3 py-1 text-red-600 bg-red-50 rounded"
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

export default User
