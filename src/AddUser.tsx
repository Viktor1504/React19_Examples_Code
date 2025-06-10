import { User } from './todoReducer.ts'

const AddUser = ({
  dispatch,
}: {
  dispatch: (action: { type: string; payload: User }) => void
}) => {
  const handleSubmit = (formData: FormData) => {
    const name = formData.get('name') as string
    const age = Number(formData.get('age'))
    const email = formData.get('email') as string
    const done = formData.get('done') as 'on' | null
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      age,
      email,
      done,
    }
    dispatch({ type: 'ADD_USER', payload: newUser })
  }

  return (
    <form
      action={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
      <div className="space-y-3">
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="age"
          type="number"
          placeholder="Age"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="done">Женат</label>
          <input name="done" type={'checkbox'} id="done" />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add User
      </button>
    </form>
  )
}

export default AddUser
