import { RolesEnum } from "../enums/roles.enum";
import { IBase } from "./base.interface";

export interface IUser extends IBase {
    _id: string;
    email: string;
    password: string;
    role: RolesEnum;
    isDeleted: boolean;
    isVerified: boolean;
    isActive: boolean;
    name: string;
    surname: string;
    age: number;
}

export type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;

export type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;
