import { addTodoAC, Todo } from './todoReducer.ts'
import { useAppDispatch } from './store.ts'

const AddTodo = () => {
  const dispatch = useAppDispatch()

  const handleAction = (formData: FormData) => {
    const title = formData.get('title') as string
    const married = formData.get('married') === 'on'
    const newUser: Todo = {
      id: crypto.randomUUID(),
      title,
      married,
      done: false,
    }
    dispatch(addTodoAC(newUser))
  }

  return (
    <form
      action={handleAction}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add New Todo</h2>
      <div className="space-y-3">
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="married">Женат</label>
          <input id="married" name="married" type={'checkbox'} />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Todo
      </button>
    </form>
  )
}

export default AddTodo
