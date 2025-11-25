import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IPizza, IPizzaCreateDTO } from "../interfaces/pizza.interface";
import { pizzaRepository } from "../repository/pizza.repository";

class PizzaService {
    public getAll(): Promise<IPizza[]> {
        return pizzaRepository.getAll();
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
