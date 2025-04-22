import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api, ApiResponse, User} from "../api/api.ts";
import {AxiosError} from "axios";
import {setError, setStatus} from "./appSlice.ts";

type UsersState = {
    users: User[];
    currentPage: number;
    totalPageCount: number;
}

const initialState: UsersState = {
    users: [],
    currentPage: 1,
    totalPageCount: 0,
};

const USERS_PER_PAGE = 3

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async ({page}: { page: number }, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setStatus("loading"));
            const response = await api.getUsers(page, USERS_PER_PAGE)
            dispatch(setTotalPageCount({totalPageCount: response.data.pages}))
            dispatch(setStatus("succeeded"));
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError
            dispatch(setError(axiosError.message))
            dispatch(setStatus("failed"));
            return rejectWithValue(axiosError.response?.data || "Failed to fetch users");
        }
    }
)

export const addUser = createAsyncThunk(
    "users/addUser",
    async (user: User, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setStatus("loading"));
            const response = await api.createUser(user)
            console.log(response)
            dispatch(setStatus("succeeded"));
            return user
        } catch (error) {
            const axiosError = error as AxiosError
            dispatch(setError(axiosError.message))
            dispatch(setStatus("failed"));
            return rejectWithValue(axiosError.response?.data || "Failed to add user");
        }
    }
)

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: (creators) => ({
        setCurrentPage: creators.reducer<{ currentPage: number }>((state, action) => {
            state.currentPage = action.payload.currentPage
        }),
        setTotalPageCount: creators.reducer<{ totalPageCount: number }>((state, action) => {
            state.totalPageCount = action.payload.totalPageCount
        })
    }),
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.users = action.payload.data;
            })
            .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload)
            })
    },
    selectors: {
        selectUsers: (state) => state.users,
        selectTotalPageCount: (state) => state.totalPageCount,
        selectCurrentPage: (state) => state.currentPage
    }
});

export const {setCurrentPage, setTotalPageCount} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
export const {selectUsers, selectTotalPageCount, selectCurrentPage} = usersSlice.selectors