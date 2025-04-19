import {createSlice} from "@reduxjs/toolkit";
import {User} from "../api/api.ts";

const usersSlice = createSlice({
        name: 'users',
        initialState: {
            users: [] as User[],
        },
        reducers: {
            setUsers(state, action) {
                state.users = action.payload;
            }
        }
    }
)

export const {setUsers} = usersSlice.actions;
export const usersReducer = usersSlice.reducer