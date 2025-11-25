import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from "./slices/auth.slice.ts";
import {pizzaReducer} from "./slices/pizza.slice.ts";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        pizza: pizzaReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;