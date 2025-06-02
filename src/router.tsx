import { createBrowserRouter, ScrollRestoration, Outlet } from 'react-router'
import MainPage from './MainPage.tsx'
import NotFound from './NotFound.tsx'
import UsersPage from './UsersPage.tsx'
import UserPage from './UserPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Outlet />
        <ScrollRestoration />
      </>
    ),
    children: [
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
            Component: UserPage,
          },
        ],
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
])

export default router
