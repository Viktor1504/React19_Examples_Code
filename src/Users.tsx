import { useNavigate } from 'react-router'
import { use } from 'react'
import API, { User } from './api.ts'
import { AxiosResponse } from 'axios'
import { MouseEvent } from 'react'

const Users = ({
  usersPromise,
}: {
  usersPromise: Promise<AxiosResponse<User[]>>
}) => {
  const navigate = useNavigate()
  const response = use(usersPromise)
  const users = response.data

  const handleDelete = async (id: string, e: MouseEvent) => {
    e.preventDefault()
    await API.deleteUser(id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {users.map((user) => (
        <div
          key={user.id}
          className="transform transition-transform hover:scale-105"
        >
          <div
            onClick={() => navigate(`/users/${user.id}`)}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                {user.name.charAt(0)}
              </div>
              <h3 className="ml-4 text-2xl font-semibold text-gray-800">
                {user.name}
              </h3>
            </div>
            <div className="text-gray-600 pl-2">
              <p className="mb-2">
                <span className="text-sm text-gray-500">Возраст: </span>
                <span className="font-medium">{user.age} лет</span>
              </p>
              <p className="text-xs text-gray-400">
                ID: {user.id.substring(0, 8)}...
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={(e) => handleDelete(user.id, e)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors duration-200"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Users
