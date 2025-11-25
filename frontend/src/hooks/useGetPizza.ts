import {useEffect, useState} from "react";
import type {IPizza} from "../models/IPizza.ts";
import {getAllPizzas} from "../services/api.service.ts";

export const useGetPizza = () => {
    const [pizza, setPizza] = useState<IPizza[]>([]);

    useEffect(() => {
        getAllPizzas().then((pizzasResponse) => {
            setPizza(pizzasResponse);
        })
    }, [])

    return pizza;
}