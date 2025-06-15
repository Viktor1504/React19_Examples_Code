import { addTodoAC, Todo } from './reducers/todoReducer.ts'
import { useAppDispatch } from './store.ts'
import { useCallback } from 'react'

const AddTodo = () => {
  const dispatch = useAppDispatch()

  const handleAction = useCallback(
    (formData: FormData) => {
      const title = (formData.get('title') as string)?.trim()

      const married = formData.get('married') === 'on'
      const newUser: Todo = {
        id: crypto.randomUUID(),
        title,
        married,
        done: false,
      }

      dispatch(addTodoAC(newUser))
    },
    [dispatch],
  )

  return (
    <form
      action={handleAction}
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Добавить пользователя
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Имя пользователя
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Введите имя..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="married"
            name="married"
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:outline-none"
          />
          <label htmlFor="married" className="text-gray-700">
            В браке
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Добавить пользователя
      </button>
    </form>
  )
}

export default AddTodo
