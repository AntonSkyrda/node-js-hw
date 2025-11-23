import { RolesEnum } from "../enums/roles.enum";
import { IBase } from "./base.interface";

export interface IToken extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

export interface ITokenPayload {
    userId: string;
    role: RolesEnum;
}

export type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;

export type IRefresh = Pick<IToken, "refreshToken">;
