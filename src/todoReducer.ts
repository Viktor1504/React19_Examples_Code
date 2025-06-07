export type User = {
  id: string
  name: string
  age: number
  email: string
}

export const todoReducer = (
  state: User[],
  action: { type: string; payload: User },
) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload]
    case 'DELETE_USER':
      return state.filter((user) => user.id !== action.payload.id)
    default:
      return state
  }
}
