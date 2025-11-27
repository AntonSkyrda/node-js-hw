import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IAuth } from "../interfaces/auth.interface";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUserCreateDTO } from "../interfaces/user.interface";
import { tokenRepository } from "../repository/token.repository";
import { authService } from "../services/auth.service";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthController {
    public async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUserCreateDTO;
            const data = await authService.signUp(body);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IAuth;

            const data = await authService.signIn(dto);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (error) {
            next(error);
        }
    }

    public async me(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPayload = res.locals.tokenPayload as ITokenPayload;
            const { userId } = tokenPayload;
            const user = await userService.getById(userId);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { role, userId } = req.res.locals
                .tokenPaload as ITokenPayload;
            const tokens = tokenService.generateTokens({ role, userId });
            await tokenRepository.create({
                ...tokens,
                _userID: userId,
            });
            res.status(StatusCodesEnum.OK).json({ tokens });
        } catch (error) {
            next(error);
        }
    }

    public async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const { token } = req.params;
            const user = await authService.activate(token);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (error) {
            next(error);
        }
    }

    public async recoveryRequest(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { email } = req.body;
            const user = await userService.getByEmail(email);
            if (user) {
                res.status(StatusCodesEnum.OK).json({
                    details: "Check your email address",
                });
            }
            await authService.recoveryPasswordRequest(user);
        } catch (error) {
            next(error);
        }
    }

    public async recoveryPassword(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            console.log(req.params);
            const { token } = req.params as { token: string };
            const { password } = req.body;
            const user = await authService.recoveryPassword(token, password);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();
