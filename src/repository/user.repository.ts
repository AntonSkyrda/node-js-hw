import {User} from "../models/user.models";
import {IUser, IUserDTO} from "../interfaces/user.interface";

class UserRepository {
    public async getAll(): Promise<IUser[]> {
        return User.find();
    }

    public async getById(userId: string): Promise<IUser> {
        return User.findById(userId)
    }

    public async create(user: IUserDTO): Promise<IUser> {
        return User.create(user)
    }

    public async update(userId: string, userData: IUserDTO): Promise<IUser> {
        return User.findByIdAndUpdate(userId, userData, {new: true})
    }

    public async delete(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId)
    }
}

export const userRepository = new UserRepository();
