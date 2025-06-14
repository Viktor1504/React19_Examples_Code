export type Todo = {
  id: string
  title: string
  married: boolean
  done: boolean
}

export const addTodoAC = (todo: Todo) =>
  ({ type: 'ADD_TODO', payload: { todo } }) as const
export const deleteTodoAC = (id: string) =>
  ({ type: 'DELETE_TODO', payload: { id } }) as const
export const updateTodoAC = (id: string, todo: Partial<Todo>) =>
  ({ type: 'UPDATE_TODO', payload: { id, todo } }) as const

type addTodosType = ReturnType<typeof addTodoAC>
type deleteTodoType = ReturnType<typeof deleteTodoAC>
type updateTodoType = ReturnType<typeof updateTodoAC>

type TodoAction = addTodosType | deleteTodoType | updateTodoType

const initialState: Todo[] = []

export const todoReducer = (
  state = initialState,
  action: TodoAction,
): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload.todo]
    case 'DELETE_TODO': {
      return state.filter((todo) => todo.id !== action.payload.id)
    }
    case 'UPDATE_TODO': {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.todo }
          : todo,
      )
    }
    default:
      return state
  }
}
