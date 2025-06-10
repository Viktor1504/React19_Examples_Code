import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from './todoReucer.ts'

const store = configureStore({
  reducer: todoReducer,
})
