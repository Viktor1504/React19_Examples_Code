import { useNavigate } from 'react-router'
import Users from './Users.tsx'
import { Suspense, useState } from 'react'
import API from './api.ts'
import { ErrorBoundary } from 'react-error-boundary'
import { AxiosError } from 'axios'

const UsersPage = () => {
  const [usersPromise] = useState(API.getUsers())
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Список пользователей
      </h1>
      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div className={'text-red-600'}>
            Something went wrong:{' '}
            {error instanceof AxiosError ? error.message : 'Unknown error'}
          </div>
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Users usersPromise={usersPromise} />
        </Suspense>
      </ErrorBoundary>
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

export default UsersPage
