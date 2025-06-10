export type Todo = {
  id: string
  title: string
  married: 'on' | null
}

export const addTodoAC = (todo: Todo) =>
  ({ type: 'ADD_TODO', payload: { todo } }) as const
export const deleteTodoAC = (id: string) =>
  ({ type: 'DELETE_TODO', payload: { id } }) as const

type addTodosType = ReturnType<typeof addTodoAC>
type deleteTodoType = ReturnType<typeof deleteTodoAC>

type TodoAction = addTodosType | deleteTodoType

const initialState: Todo[] = []

export const todoReducer = (state = initialState, action: TodoAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload.todo]
    case 'DELETE_TODO': {
      return state.filter((todo) => todo.id !== action.payload.id)
    }
    default:
      return state
  }
}
