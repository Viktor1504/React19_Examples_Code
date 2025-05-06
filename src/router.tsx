import { Route, Routes } from 'react-router'
import Info from './Info.tsx'
import NotFound from './NotFound.tsx'
import Home from './Home.tsx'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Home />} />
      <Route path={'/info'} element={<Info />} />
      <Route path={'/*'} element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
