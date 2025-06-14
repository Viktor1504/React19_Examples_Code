import { deleteTodoAC, Todo, updateTodoAC } from './todoReducer.ts'
import { useAppDispatch } from './store.ts'
import { useState, useCallback } from 'react'

interface UserProps {
  todo: Todo
}

const User = ({ todo }: UserProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    title: todo.title,
    married: todo.married,
  })

  const dispatch = useAppDispatch()

  const handleEdit = useCallback(() => {
    setEditForm({ title: todo.title, married: todo.married })
    setIsEditing(true)
  }, [todo.title, todo.married])

  const handleSave = useCallback(() => {
    if (editForm.title.trim()) {
      dispatch(
        updateTodoAC(todo.id, {
          title: editForm.title.trim(),
          married: editForm.married,
        }),
      )
      setIsEditing(false)
    }
  }, [dispatch, todo.id, editForm])

  const handleCancel = useCallback(() => {
    setEditForm({ title: todo.title, married: todo.married })
    setIsEditing(false)
  }, [todo.title, todo.married])

  const handleDelete = useCallback(() => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      dispatch(deleteTodoAC(todo.id))
    }
  }, [dispatch, todo.id])

  const toggleDone = useCallback(() => {
    dispatch(updateTodoAC(todo.id, { done: !todo.done }))
  }, [dispatch, todo.id, todo.done])

  const handleInputChange = useCallback(
    (field: keyof typeof editForm) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm((prev) => ({
          ...prev,
          [field]: field === 'married' ? e.target.checked : e.target.value,
        }))
      },
    [],
  )

  const isFormValid = editForm.title.trim().length > 0

  return (
    <div
      className={`
      p-4 rounded-lg border shadow-md hover:shadow-lg transition-shadow
      ${todo.done ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}
    `}
    >
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`title-${todo.id}`}
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Имя пользователя
            </label>
            <input
              id={`title-${todo.id}`}
              type="text"
              value={editForm.title}
              onChange={handleInputChange('title')}
              placeholder="Введите имя..."
              className={`
                w-full px-3 py-2 rounded border
                ${
                  isFormValid
                    ? 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                    : 'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                }
              `}
              autoFocus
            />
            {!isFormValid && (
              <p className="text-red-500 text-sm mt-1">
                Имя не может быть пустым
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              id={`married-${todo.id}`}
              type="checkbox"
              checked={editForm.married}
              onChange={handleInputChange('married')}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:outline-none"
            />
            <label htmlFor={`married-${todo.id}`} className="text-gray-700">
              В браке
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-2 border-t">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`
                px-4 py-2 rounded
                ${
                  isFormValid
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <div onDoubleClick={handleEdit} className="cursor-pointer">
          <div className="space-y-2">
            <h3
              className={`text-lg font-semibold ${todo.done ? 'line-through text-gray-500' : 'text-gray-800'}`}
            >
              {todo.title}
            </h3>
            <p className="text-gray-600">
              Семейное положение:{' '}
              <span className="font-medium">
                {todo.married ? 'В браке' : 'Не женат/не замужем'}
              </span>
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <div className="flex items-center space-x-2">
          <input
            id={`done-${todo.id}`}
            type="checkbox"
            checked={todo.done}
            onChange={toggleDone}
            className="w-4 h-4 text-green-600 rounded border-gray-300 focus:outline-none"
          />
          <label htmlFor={`done-${todo.id}`} className="text-gray-700">
            {todo.done ? 'Завершено' : 'В работе'}
          </label>
        </div>

        <button
          onClick={handleDelete}
          className="px-3 py-1 text-red-600 bg-red-50 rounded hover:bg-red-100 border border-red-200"
        >
          Удалить
        </button>
      </div>
    </div>
  )
}

export default User
