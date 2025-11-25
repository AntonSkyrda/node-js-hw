import { IPizza, IPizzaCreateDTO } from "../interfaces/pizza.interface";
import { Pizza } from "../models/pizza.model";

class PizzaRepository {
    public getAll(): Promise<IPizza[]> {
        return Pizza.find();
    }

    public getById(pizzaId: string): Promise<IPizza> {
        return Pizza.findById(pizzaId);
    }

    public create(pizza: IPizzaCreateDTO): Promise<IPizza> {
        return Pizza.create(pizza);
    }

    public update(
        pizzaId: string,
        pizzaData: Partial<IPizza>,
    ): Promise<IPizza> {
        return Pizza.findByIdAndUpdate(pizzaId, pizzaData, { new: true });
    }

    public delete(pizzaId: string): Promise<IPizza> {
        return Pizza.findByIdAndDelete(pizzaId);
    }
}

export const pizzaRepository = new PizzaRepository();
