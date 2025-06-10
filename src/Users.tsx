const Users = ({
  dispatch,
  users,
}: {
  dispatch: ({ type, payload }: { type: string; payload: User }) => void
  users: User[]
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Users</h1>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-md border border-gray-200"
            >
              <div className="text-gray-700">
                <p className="font-medium">Name: {user.name}</p>
                <p>Age: {user.age}</p>
                <p>Email: {user.email}</p>
                <p>Женат: {user.done ? 'Да' : 'Нет'}</p>
              </div>
              <button
                onClick={() => dispatch({ type: 'DELETE_USER', payload: user })}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users
