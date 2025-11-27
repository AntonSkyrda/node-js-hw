import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {IPizza} from "../../models/IPizza.ts";
import {pizzaService} from "../../services/pizza.service.ts";

interface IState {
    pizzas: IPizza[];
    trigger: boolean
}

const initialState: IState = {
    pizzas: [],
    trigger: null
}


const getAll = createAsyncThunk<IPizza[], void>(
    "pizzaSlice/getAll",
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await pizzaService.getAll();
            return data
        } catch (error) {
            return rejectWithValue(error);
        }
})

const create = createAsyncThunk<IPizza, { pizza: IPizza }>(
    "pizzaSlice/create",
    async ({pizza}, {rejectWithValue}) => {
        try {
            const {data} = await pizzaService.create(pizza)
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const pizzaSlice = createSlice({
    name: "pizzaSlice",
    initialState,
    reducers:{},
    extraReducers: builder => builder
        .addCase(getAll.fulfilled, (state, action) => {
            state.pizzas = action.payload
        })
        .addCase(create.fulfilled, (state) => {
            state.trigger = !state.trigger
        })
})

const {reducer: pizzaReducer, actions} = pizzaSlice;

const pizzaActions = {
    ...actions,
    getAll,
    create,
}

export {
    pizzaReducer,
    pizzaActions,
}