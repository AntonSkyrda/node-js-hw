import { FilterQuery } from "mongoose";

import {
    IPizza,
    IPizzaCreateDTO,
    IPizzaQuery,
} from "../interfaces/pizza.interface";
import { Pizza } from "../models/pizza.model";

class PizzaRepository {
    public async getAll(query: IPizzaQuery): Promise<[IPizza[], number]> {
        const filterObject: FilterQuery<IPizza> = {};
        const skip = query.itemsPerPage * (query.page - 1);

        if (query.name) {
            filterObject.name = { $regex: query.name, $options: "i" };
        }

        if (query.price) {
            filterObject.price = query.price;
        }

        if (query.diameter) {
            filterObject.diameter = query.diameter;
        }

        return await Promise.all([
            Pizza.find(filterObject)
                .limit(query.itemsPerPage)
                .skip(skip)
                .sort(query.orderBy),
            Pizza.find(filterObject).countDocuments(),
        ]);
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
