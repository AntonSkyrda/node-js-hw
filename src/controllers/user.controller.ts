import {Request, Response} from "express";
import {userService} from "../services/user.service";
import {StatusCodes} from "../enums/status-codes.enum";
import {IUserDTO} from "../interfaces/user.interface";

class UserController {
    public async getAll(req: Request, res: Response) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    public async getById(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const data = await userService.getById(id);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const user = req.body as IUserDTO;
            const data = await userService.create(user);
            res.status(StatusCodes.CREATED).json(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const newData = req.body as IUserDTO;
            const data = await userService.update(id, newData);
            res.status(StatusCodes.OK).json(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await userService.delete(id);
            res.status(StatusCodes.NO_CONTENT).end();
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const userController = new UserController();