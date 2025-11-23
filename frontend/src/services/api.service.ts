import axios from "axios";
import type { IUser } from "../models/IUser.ts";
import { baseUrl } from "../constants/constants.ts";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getAllUsers = async (): Promise<IUser[]> => {
    const { data } = await axiosInstance.get<IUser[]>("/users");
    return data;
};

