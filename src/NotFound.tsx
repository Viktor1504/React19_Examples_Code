import { Navigate } from 'react-router'

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Navigate to={'/'} replace={true} />
    </div>
  )
}

export default NotFound
