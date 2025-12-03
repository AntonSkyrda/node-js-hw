import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import {
    IPizza,
    IPizzaCreateDTO,
    IPizzaQuery,
} from "../interfaces/pizza.interface";
import { pizzaService } from "../services/pizza.service";

class PizzaController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any as IPizzaQuery;
            const data = await pizzaService.getAll(query);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await pizzaService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const pizza = req.body as IPizzaCreateDTO;
            const data = await pizzaService.create(pizza);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const newData = req.body as Partial<IPizza>;
            const data = await pizzaService.update(id, newData);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await pizzaService.delete(id);
            res.status(StatusCodesEnum.NO_CONTENT).json();
        } catch (error) {
            next(error);
        }
    }
}

export const pizzaController = new PizzaController();
