import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import { IRefresh, ITokenPayload } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            const accessToken = authorizationHeader.split(" ")[1];
            if (!accessToken) {
                throw new ApiError(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            const tokenPayload = tokenService.verifyToken(
                accessToken,
                "access",
            );
            const isTokenExists = await tokenService.isTokenExists(
                accessToken,
                "accessToken",
            );
            if (!isTokenExists) {
                throw new ApiError(
                    "Invalid token",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        } catch (error) {
            next(error);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body as IRefresh;

            if (!refreshToken) {
                throw new ApiError(
                    "No refresh token provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }

            const tokenPayload = tokenService.verifyToken(
                refreshToken,
                "refresh",
            );

            const isTokenExists = await tokenService.isTokenExists(
                refreshToken,
                "refreshToken",
            );
            if (!isTokenExists) {
                throw new ApiError("Invalid token", StatusCodesEnum.FORBIDDEN);
            }
            const isActive = await userService.isActive(tokenPayload.userId);

            if (!isActive) {
                throw new ApiError(
                    "Account is not active",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            req.res.locals.tokenPayload = tokenPayload;

            next();
        } catch (error) {
            next(error);
        }
    }

    public isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = req.res.locals.tokenPayload as ITokenPayload;
            if (role !== "admin") {
                throw new ApiError(
                    "No has permission",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
