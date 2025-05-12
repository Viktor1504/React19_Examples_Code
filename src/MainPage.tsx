import { NavLink } from 'react-router'

const MainPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Добро пожаловать
      </h1>

      <div className="flex justify-center">
        <NavLink
          to="users"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md
                     hover:bg-blue-700 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          К списку пользователей
        </NavLink>
      </div>
    </div>
  )
}

export default MainPage
