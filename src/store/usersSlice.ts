import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api, ApiResponse, User} from "../api/api.ts";
import {AxiosError} from "axios";

type UsersState = {
    users: User[];
    currentPage: number;
    totalPageCount: number;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
};

const initialState: UsersState = {
    users: [],
    currentPage: 1,
    totalPageCount: 0,
    status: "idle",
    error: null,
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async ({page, limit}: { page: number; limit: number }, {rejectWithValue}) => {
        try {
            const response = await api.getUsers(page, limit);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError
            return rejectWithValue(axiosError.response?.data || "Failed to fetch users");
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.status = "succeeded";
                state.users = action.payload.data;
                state.totalPageCount = action.payload.pages;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
    selectors: {
        selectUsers: (state) => state.users
    }
});

export const {setCurrentPage} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;