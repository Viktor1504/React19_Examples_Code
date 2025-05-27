import { useCallback, useState } from 'react'
import API from './api.ts'
import { AxiosError } from 'axios'
import { useBeforeUnload } from 'react-router'

const AddUserPage = ({ refetchUsers }: { refetchUsers: () => void }) => {
  const [hasUnsavedData, setHasUnsavedData] = useState(false)

  // срабатывает перед выходом, обновлением страницы, закрытием вкладки
  useBeforeUnload(
    useCallback(
      (e) => {
        if (hasUnsavedData) {
          e.preventDefault()
        }
      },
      [hasUnsavedData],
    ),
  )

  const handleInputChange = () => {
    setHasUnsavedData(true)
  }

  const handleAction = async (formData: FormData) => {
    const name = formData.get('name') as string
    const age = formData.get('age') as string

    if (name && age) {
      try {
        await API.addUser({ id: crypto.randomUUID(), name, age })
        setHasUnsavedData(false) // Сбрасываем флаг после успешного сохранения
        refetchUsers()
      } catch (error) {
        const err = error as AxiosError | Error
        alert('Не удалось добавить пользователя ' + err.message)
      }
    }
  }

  return (
    <form
      action={handleAction}
      className="grid grid-cols-3 gap-4 mb-6 max-w-4xl mx-auto"
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        onChange={handleInputChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />
      <input
        type="number"
        name="age"
        placeholder="Возраст"
        onChange={handleInputChange}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Добавить
      </button>
    </form>
  )
}

export default AddUserPage
