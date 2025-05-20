import { useNavigate } from 'react-router'
import Users from './Users.tsx'
import { startTransition, Suspense, useState } from 'react'
import API from './api.ts'
import { ErrorBoundary } from 'react-error-boundary'
import { AxiosError } from 'axios'
import AddUserPage from './AddUserPage.tsx'

const defaultFetchUsers = API.fetchUsers()

const UsersPage = () => {
  const [usersPromise, setUsersPromise] = useState(defaultFetchUsers)
  const refetchUsers = () =>
    startTransition(() => setUsersPromise(API.fetchUsers()))
  const navigate = useNavigate()

  const handleSearch = (value: string) => {
    startTransition(() => setUsersPromise(API.searchUsers(value)))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Список пользователей
      </h1>
      <AddUserPage refetchUsers={refetchUsers} />
      <input
        type="text"
        name="search"
        placeholder="Поиск"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        onChange={(e) => handleSearch(e.currentTarget.value)}
      />

      <ErrorBoundary
        fallbackRender={({ error }) => (
          <div className={'text-red-600'}>
            Something went wrong:{' '}
            {error instanceof AxiosError ? error.message : 'Unknown error'}
          </div>
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Users usersPromise={usersPromise} refetchUsers={refetchUsers} />
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
