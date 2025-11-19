import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.errors";
import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repository/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return userRepository.create(user);
    }

    public async update(
        userId: string,
        userData: IUserUpdateDTO,
    ): Promise<IUser> {
        const user = await userRepository.update(userId, userData);
        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return await userRepository.update(userId, userData);
    }

    public async delete(userId: string): Promise<void> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ApiError("User not found", StatusCodesEnum.NOT_FOUND);
        }
        await userRepository.delete(userId);
    }

    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);

        if (user) {
            throw new ApiError(
                "User is already exists",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
    }

    public async isActive(id: string): Promise<boolean> {
        const user = await this.getById(id);
        return user.isActive;
    }

    public blockUer(userId: string): Promise<IUser> {
        return userRepository.blockUser(userId);
    }

    public unblockUer(userId: string): Promise<IUser> {
        return userRepository.unblockUser(userId);
    }
}

export const userService = new UserService();
