import Users from './Users.tsx'
import AddTodo from './AddUser.tsx'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <AddTodo />
        <Users />
      </div>
    </div>
  )
}

export default App
