import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        404 - Страница не найдена
      </h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 w-full mb-8 text-center">
        <p className="text-lg text-gray-600">
          Извините, запрашиваемая страница не существует.
        </p>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md
                     hover:bg-blue-700 focus:outline-none focus:ring-2
                     focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Назад
        </button>
      </div>
    </div>
  )
}

export default NotFound
