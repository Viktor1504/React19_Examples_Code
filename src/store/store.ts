import {configureStore} from "@reduxjs/toolkit";
import {usersReducer} from "./usersSlice.ts";
import {appReducer} from "./appSlice.ts";
import {appSlice} from "./appSlice.ts";
import {usersSlice} from "./usersSlice.ts";

export const store = configureStore({
    reducer: {
        [appSlice.name]: appReducer,
        [usersSlice.name]: usersReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
