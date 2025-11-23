import { useEffect, useState } from "react";
import type { IUser } from "../models/IUser.ts";
import { getAllUsers } from "../services/api.service.ts";

export const useGetUsers = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        getAllUsers().then((usersResponse) => {
            setUsers(usersResponse)
        })
    },[])

    return users;
}