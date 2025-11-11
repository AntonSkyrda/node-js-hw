import {userRepository} from "../repository/user.repository";
import {IUser, IUserDTO} from "../interfaces/user.interface";

class UserService {
    public getAll():Promise<IUser[]> {
        return userRepository.getAll()
    }

    public getById(userId: string): Promise<IUserDTO> {
        return userRepository.getById(userId)
    }

    public create(user: IUserDTO): Promise<IUser> {
        return userRepository.create(user)
    }

    public update(userId: string, userData: IUserDTO): Promise<IUser> {
        return userRepository.update(userId, userData)
    }

    public delete(userId: string): Promise<IUser> {
        return userRepository.delete(userId)
    }
}

export const userService = new UserService();
