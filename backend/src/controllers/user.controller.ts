import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const newData = req.body as IUserUpdateDTO;
            const data = await userService.update(id, newData);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.delete(id);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (error) {
            next(error);
        }
    }

    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = req.res.locals.tokenPayload as ITokenPayload;

            if (id === userId) {
                throw new ApiError("Not permitted", StatusCodesEnum.FORBIDDEN);
            }

            const data = await userService.blockUer(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async unblockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { userId } = req.res.locals.tokenPayload as ITokenPayload;

            if (id === userId) {
                throw new ApiError("Not permitted", StatusCodesEnum.FORBIDDEN);
            }

            const data = await userService.unblockUer(id);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
