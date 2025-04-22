import {createSlice} from "@reduxjs/toolkit";

type AppState = {
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: AppState = {
    status: "idle",
    error: null
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setStatus(state, action) {
            state.status = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        }
    },
    selectors: {
        selectStatus: (state) => state.status,
        selectError: (state) => state.error
    }
})

export const {setStatus, setError} = appSlice.actions
export const appReducer = appSlice.reducer;