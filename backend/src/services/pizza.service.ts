import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
    IPizza,
    IPizzaCreateDTO,
    IPizzaQuery,
} from "../interfaces/pizza.interface";
import { pizzaRepository } from "../repository/pizza.repository";

class PizzaService {
    public async getAll(
        query: IPizzaQuery,
    ): Promise<IPaginatedResponse<IPizza>> {
        const [data, totalItems] = await pizzaRepository.getAll(query);
        const totalPages = Math.ceil(totalItems / query.itemsPerPage);

        return {
            totalItems,
            totalPages,
            previousPage: !!(query.page - 1),
            nextPage: query.page + 1 <= totalPages,
            data: data,
        };
    }

    public async getById(pizzaId: string): Promise<IPizza> {
        const pizza = await pizzaRepository.getById(pizzaId);
        if (!pizza) {
            throw new ApiError("Pizza not found", StatusCodesEnum.NOT_FOUND);
        }

        return pizza;
    }

    public create(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return pizzaRepository.create(pizza);
    }

    public async update(
        pizzaId: string,
        pizzaData: Partial<IPizza>,
    ): Promise<IPizza> {
        const pizza = pizzaRepository.getById(pizzaId);
        if (!pizza) {
            throw new ApiError("Pizza not found", StatusCodesEnum.NOT_FOUND);
        }

        return await pizzaRepository.update(pizzaId, pizzaData);
    }

    public async delete(pizzaId: string): Promise<void> {
        const pizza = await pizzaRepository.getById(pizzaId);
        if (!pizza) {
            throw new ApiError("Pizza not found", StatusCodesEnum.NOT_FOUND);
        }

        await pizzaRepository.delete(pizzaId);
    }
}

export const pizzaService = new PizzaService();
