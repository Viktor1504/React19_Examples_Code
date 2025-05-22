import { useNavigate } from 'react-router'
import { MouseEvent, use } from 'react'
import API, { User } from './api.ts'
import { AxiosError, AxiosResponse } from 'axios'

const Users = ({
  usersPromise,
  refetchUsers,
}: {
  usersPromise: Promise<AxiosResponse<User[]>>
  refetchUsers: () => void
}) => {
  const navigate = useNavigate()
  const { data: users } = use(usersPromise)

  const handleDelete = async (id: string, e: MouseEvent) => {
    e.stopPropagation()
    try {
      await API.deleteUser(id)
      refetchUsers()
    } catch (error) {
      const err = error as AxiosError | Error
      alert('Не удалось удалить пользователя ' + err.message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {users &&
          users.map((user) => (
            <div
              key={user.id}
              className="transform transition-all duration-300 hover:scale-102 hover:-translate-y-1"
            >
              <div
                onClick={() => navigate(`/users/${user.id}`)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold text-xl shadow-md">
                      {user.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold text-white">
                        {user.name}
                      </h3>
                      <p className="text-blue-100 text-sm">
                        ID: {user.id.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-gray-500">Возраст:</span>
                    </div>
                    <p className="text-gray-800 font-medium pl-4">{user.age}</p>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={(e) => handleDelete(user.id, e)}
                      className="bg-red-50 text-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300"
                    >
                      Удалить
                    </button>

                    <button
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="bg-blue-50 text-blue-500 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Users
