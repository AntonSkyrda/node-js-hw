import axios from "axios";
import type { IUser } from "../models/IUser.ts";
import { baseUrl } from "../constants/constants.ts";
import type {IPizza} from "../models/IPizza.ts";
import {authService} from "./auth.service.ts";

export const apiService = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
})

apiService.interceptors.request.use(req => {
    const accessToken = authService.getAccessToken()

    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }

    return req;
})

apiService.interceptors.response.use()

export const getAllUsers = async (): Promise<IUser[]> => {
    const { data } = await apiService.get<IUser[]>("/users");
    return data;
};

export const getAllPizzas = async (): Promise<IPizza[]> => {
    const { data } = await apiService.get<IPizza[]>("/pizzas");

    return data
}