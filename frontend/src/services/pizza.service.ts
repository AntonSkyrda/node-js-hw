import type {IResponseType} from "../types/response.type.ts";
import type {IPizza} from "../models/IPizza.ts";
import {apiService} from "./api.service.ts";
import {urls} from "../constants/urls.ts";

export const pizzaService = {
    create(data: IPizza): IResponseType<IPizza> {
        return apiService.post(urls.pizzas, data);
    },
    getAll(): IResponseType<IPizza[]> {
        return apiService.get(urls.pizzas);
    }
}