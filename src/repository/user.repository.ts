import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.models";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public update(userId: string, userData: IUserUpdateDTO): Promise<IUser> {
        return User.findByIdAndUpdate(userId, userData, { new: true });
    }

    public delete(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }
}

export const userRepository = new UserRepository();
