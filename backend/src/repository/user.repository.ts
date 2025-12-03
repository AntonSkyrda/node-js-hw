import { FilterQuery } from "mongoose";

import {
    IUser,
    IUserCreateDTO,
    IUserQuery,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(query: IUserQuery): Promise<any> {
        const filterObject: FilterQuery<IUser> = { isDeleted: false };
        const skip = query.itemsPerPage * (query.page - 1);
        if (query.search) {
            filterObject.$or = [
                { name: { $regex: query.search, $options: "i" } },
                { surname: { $regex: query.search, $options: "i" } },
            ];
        }

        return Promise.all([
            User.find(filterObject)
                .limit(query.itemsPerPage)
                .skip(skip)
                .sort(query.orderBy),
        ]);
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public update(userId: string, userData: Partial<IUser>): Promise<IUser> {
        return User.findByIdAndUpdate(userId, userData, { new: true });
    }

    public delete(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }

    public blockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true },
        );
    }

    public unblockUser(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true },
        );
    }
}

export const userRepository = new UserRepository();
