import { IUser, IUserDTO } from "../interfaces/user.interface";
import { User } from "../models/user.models";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }

    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user);
    }

    public update(userId: string, userData: IUserDTO): Promise<IUser> {
        return User.findByIdAndUpdate(userId, userData, { new: true });
    }

    public delete(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }
}

export const userRepository = new UserRepository();
