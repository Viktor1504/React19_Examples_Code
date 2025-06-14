import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from './todoReducer.ts'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: todoReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store
