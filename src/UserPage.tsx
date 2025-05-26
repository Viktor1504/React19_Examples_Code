import { Navigate, useNavigate, useParams } from 'react-router'
import { MouseEvent, Suspense, use, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import API, { User } from './api.ts'
import { AxiosError, AxiosResponse } from 'axios'
import NotFound from './NotFound.tsx'

const UserDetail = ({
  userPromise,
}: {
  userPromise: Promise<AxiosResponse<User>>
}) => {
  const navigate = useNavigate()
  const { data: user } = use(userPromise)
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user.name)
  const [age, setAge] = useState(user.age)

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

  const handleAction = async (formData: FormData) => {
    const name = formData.get('name') as string
    const age = formData.get('age') as string

    try {
      await API.updateUser({ ...user, name, age })
      setName(name)
      setAge(age)
      setIsEditing(false)
    } catch (error) {
      const err = error as AxiosError | Error
      alert('Не удалось обновить пользователя ' + err.message)
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

        <form action={handleAction} className="p-8">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-2xl shadow-md border-2 border-blue-100">
              {user.name.charAt(0)}
            </div>
            <div className="ml-6 flex-1">
              {isEditing ? (
                <input
                  name="name"
                  defaultValue={name}
                  className="text-3xl font-bold text-gray-800 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                  autoFocus
                />
              ) : (
                <h2
                  className="text-3xl font-bold text-gray-800 cursor-pointer"
                  onDoubleClick={() => setIsEditing(true)}
                >
                  {name}
                </h2>
              )}
              <p className="text-blue-500 text-sm mt-1">
                ID: {user.id.substring(0, 8)}...
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <label className="text-gray-500 text-lg block mb-2">Возраст:</label>
            {isEditing ? (
              <input
                name="age"
                type="number"
                defaultValue={age}
                className="text-gray-800 text-xl font-medium rounded-lg border border-gray-300 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
                max="150"
              />
            ) : (
              <span
                className="text-gray-800 text-xl font-medium cursor-pointer"
                onDoubleClick={() => setIsEditing(true)}
              >
                {age}
              </span>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={(e) => handleDelete(user.id, e)}
              className="bg-red-50 text-red-500 border border-red-200 px-6 py-3 rounded-lg hover:bg-red-500 hover:text-white transition-all"
            >
              Удалить
            </button>

            <div className="space-x-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-50 text-gray-500 border border-gray-200 px-6 py-3 rounded-lg hover:bg-gray-500 hover:text-white transition-all"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="bg-green-50 text-green-500 border border-green-200 px-6 py-3 rounded-lg hover:bg-green-500 hover:text-white transition-all"
                  >
                    Сохранить
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-amber-50 text-amber-500 border border-amber-200 px-6 py-3 rounded-lg hover:bg-amber-500 hover:text-white transition-all"
                >
                  Редактировать
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => navigate('/users')}
              className="bg-blue-50 text-blue-500 border border-blue-200 px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
            >
              К списку
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const UserPage = () => {
  const { id } = useParams<{ id?: string }>()
  if (!id) return <Navigate to={'*'} />

  const userPromise = API.getUser(id)

  return (
    <ErrorBoundary fallbackRender={({ error }) => <NotFound error={error} />}>
      <Suspense fallback={<div className="text-center mt-8">Загрузка...</div>}>
        <UserDetail userPromise={userPromise} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default UserPage
