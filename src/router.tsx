import { createBrowserRouter } from 'react-router'
import MainPage from './MainPage.tsx'
import Users from './Users.tsx'
import UserDetail from './UserDetail.tsx'
import NotFound from './NotFound.tsx'

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
        Component: Users,
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

/*const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="users">
        <Route index element={<Users />} />
        <Route path=":id" element={<UserDetail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path={'not-found'} element={<NotFound />} />
    </Routes>
  )
}
export default AppRoutes*/
