import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import type {IUser} from "../../models/IUser.ts";
import type {IAuth} from "../../models/IAuth.ts";
import {authService} from "../../services/auth.service.ts";

interface IState {
    me: IUser;
    error: boolean
}

const initialState: IState = {
    me: null,
    error: null
}

const login = createAsyncThunk<IUser, {user: IAuth}>(
    "authSlice/login",
    async ({user}, {rejectWithValue}) => {
        try {
            return await authService.login(user);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const me = createAsyncThunk<IUser, void>(
    "authSlice/me",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.me();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload
            })
            .addCase(me.fulfilled, (state, action) =>{
                state.me = action.payload
            })
            .addMatcher(isRejected(login), state => {
                state.error = true
            })
            .addMatcher(isFulfilled(login), state => {
                state.error = false
            })
})

const {reducer: authReducer, actions} = authSlice;

const authActions = {
    ...actions,
    login,
    me
}

export {
    authActions,
    authReducer
}