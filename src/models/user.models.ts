import { model, Schema } from "mongoose";

import { RolesEnum } from "../enums/roles.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            enum: RolesEnum,
            type: String,
            required: true,
            default: RolesEnum.USER,
        },
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isVarified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model<IUser>("user", userSchema);
