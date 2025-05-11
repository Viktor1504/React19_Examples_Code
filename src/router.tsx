import { Route, Routes } from 'react-router'
import Users from './Users.tsx'
import NotFound from './NotFound.tsx'
import Home from './Home.tsx'
import UserDetail from './UserDetail.tsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/users'} element={<Users />} />
      <Route path={'/users/:id'} element={<UserDetail />} />
      <Route path={'/not-found'} element={<NotFound />} />
      <Route path={'/*'} element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
