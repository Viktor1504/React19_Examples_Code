import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from './todoReducer.ts'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: todoReducer,
})

type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useTodosSelector = (state: RootState) => state
