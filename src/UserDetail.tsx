import { Navigate, useNavigate, useParams } from 'react-router'
import { useUsers } from './hooks/useUsers.ts'

const UserDetail = () => {
  const { users } = useUsers()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const user = users.find((user) => user.id === id)

  return user ? (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Информация о пользователе
      </h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
            {user.name.charAt(0)}
          </div>
          <h3 className="ml-4 text-2xl font-semibold text-gray-700">
            {user.name}
          </h3>
        </div>
        <div className="text-gray-600 pl-2">
          <p className="mb-2 text-lg">
            Возраст: <span className="font-medium">{user.age} лет</span>
          </p>
          <p className="text-sm text-gray-400">
            ID: {user.id.substring(0, 8)}...
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md
                     hover:bg-blue-700 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          На главную
        </button>
      </div>
    </div>
  ) : (
    <Navigate to={'/not-found'} />
  )
}

export default UserDetail
