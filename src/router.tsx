import { createBrowserRouter } from 'react-router'
import MainPage from './MainPage.tsx'
import NotFound from './NotFound.tsx'
import UsersPage from './UsersPage.tsx'
import { UserDetail } from './UserDetail.tsx'

const router = createBrowserRouter([
  {
    index: true,
    Component: MainPage,
  },
  {
    path: 'users',
    children: [
      {
        index: true,
        Component: UsersPage,
      },
      {
        path: ':id',
        Component: UserDetail,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
])

export default router
