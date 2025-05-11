import { useNavigate } from 'react-router'
import { useUsers } from './hooks/useUsers.ts'

const Users = () => {
  const navigate = useNavigate()
  const { users } = useUsers()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Список пользователей
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => navigate(`/users/${user.id}`)}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm
                       hover:shadow-md transition-all duration-200 cursor-pointer
                       transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <h3 className="ml-3 text-xl font-semibold text-gray-700">
                {user.name}
              </h3>
            </div>
            <div className="text-gray-600 pl-2">
              <p className="mb-1">
                Возраст: <span className="font-medium">{user.age} лет</span>
              </p>
              <p className="text-xs text-gray-400">
                ID: {user.id.substring(0, 8)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
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
  )
}

export default Users
