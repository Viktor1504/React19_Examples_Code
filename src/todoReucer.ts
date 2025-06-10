export type Todo = {
  id: string
  title: string
  done: boolean
}

export const addTodoAC = (todo: Todo) =>
  ({ type: 'ADD_TODO', payload: { todo } }) as const
export const deleteTodoAC = (id: string) =>
  ({ type: 'DELETE_TODO', payload: { id } }) as const
export const setDoneAC = (id: string, done: boolean) =>
  ({ type: 'SET_DONE', payload: { id, done } }) as const

type addTodosType = ReturnType<typeof addTodoAC>
type deleteTodoType = ReturnType<typeof deleteTodoAC>
type setDoneType = ReturnType<typeof setDoneAC>

type TodoAction = addTodosType | deleteTodoType | setDoneType

export const todoReducer = (state: Todo[] = [], action: TodoAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload.todo]
    case 'DELETE_TODO': {
      return state.filter((todo) => todo.id !== action.payload.id)
    }
    case 'SET_DONE': {
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo,
      )
    }
    default:
      return state
  }
}
