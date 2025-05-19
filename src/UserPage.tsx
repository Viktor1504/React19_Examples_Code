import { Navigate, useNavigate, useParams } from 'react-router'
import { Suspense, MouseEvent, use, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import API, { User } from './api.ts'
import { AxiosError, AxiosResponse } from 'axios'

const UserDetail = ({
  userPromise,
}: {
  userPromise: Promise<AxiosResponse<User>>
}) => {
  const navigate = useNavigate()
  const { data: user } = use(userPromise)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState<string>(user.name)
  const [age, setAge] = useState<string>(user.age)

  const handleDelete = async (id: string, e: MouseEvent) => {
    e.stopPropagation()
    try {
      await API.deleteUser(id)
      navigate('/users')
    } catch (error) {
      const err = error as AxiosError | Error
      alert('Не удалось удалить пользователя ' + err.message)
    }
  }

  const handleEdit = async () => {
    try {
      setIsEditing(false)
      const newUser = { ...user, name, age }
      await API.updateUser(newUser)
    } catch (error) {
      const err = error as AxiosError | Error
      alert('Не удалось обновить пользователя ' + err.message)
      setIsEditing(true)
    }
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h1 className="text-3xl font-bold text-white text-center">
            Информация о пользователе
          </h1>
        </div>

        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-2xl shadow-md border-2 border-blue-100">
              {name.charAt(0)}
            </div>
            <div className="ml-6">
              {isEditing ? (
                <input
                  className="text-3xl font-bold text-gray-800 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={name}
                  autoFocus
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-800">{name}</h2>
              )}
              <p className="text-blue-500 text-sm mt-1">
                ID: {user.id.substring(0, 8)}...
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-gray-500 text-lg">Возраст:</span>
            </div>
            {isEditing ? (
              <input
                className="text-gray-800 text-xl font-medium pl-4 rounded-lg border border-gray-300 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="number"
                value={age}
                onChange={(e) => setAge(e.currentTarget.value)}
              />
            ) : (
              <p className="text-gray-800 text-xl font-medium pl-4">{age}</p>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={(e) => handleDelete(user.id, e)}
              className="bg-red-50 text-red-500 border border-red-200 px-6 py-3 rounded-lg font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
            >
              Удалить
            </button>

            {isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-green-50 text-green-500 border border-green-200 px-6 py-3 rounded-lg font-medium hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300"
              >
                Сохранить
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-amber-50 text-amber-500 border border-amber-200 px-6 py-3 rounded-lg font-medium hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300"
              >
                Редактировать
              </button>
            )}

            <button
              onClick={() => navigate('/users/')}
              className="bg-blue-50 text-blue-500 border border-blue-200 px-6 py-3 rounded-lg font-medium hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300"
            >
              К списку пользователей
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserPage = () => {
  const { id } = useParams<{ id?: string }>()
  if (!id) return <Navigate to={'*'} />

  const userPromise = API.getUser(id)

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          Что-то пошло не так:{' '}
          {error instanceof AxiosError ? error.message : 'Неизвестная ошибка'}
        </div>
      )}
    >
      <Suspense
        fallback={
          <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Загрузка...</p>
          </div>
        }
      >
        <UserDetail userPromise={userPromise} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default UserPage
