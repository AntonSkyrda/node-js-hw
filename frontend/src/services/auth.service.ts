import type {IAuth} from "../models/IAuth.ts";
import type {IUser} from "../models/IUser.ts";
import {urls} from "../constants/urls.ts";
import {apiService} from "./api.service.ts";
import type {IToken} from "../models/IToken.ts";
import type {IResponseType} from "../types/response.type.ts";


const _accessToken = "accessToken";
const _refreshToken = "refreshToken";

export const authService = {
    register(user: IAuth): IResponseType<IUser[]> {
        return authService.register(user);
    },

    async refresh():Promise<void> {
        const refreshToken = this.getRefreshToken()
        if (refreshToken) {
           const {data} = await apiService.post<IToken>(urls.auth.refresh, {refreshToken});
           this.setTokens(data);
        }
    },


    async login(user: IAuth): Promise<IUser> {
        const {data} = await apiService.post<IToken>(urls.auth.login,user);
        this.setTokens(data);
        const {data:me} = await this.me();
        return me;
    },

    deleteTokens():void {
        localStorage.removeItem(_accessToken);
        localStorage.removeItem(_refreshToken);
    },

    me(): IResponseType<IUser> {
        return apiService.get(urls.auth.me);
    },

    setTokens({tokens:{accessToken, refreshToken}}: IToken): void {
        localStorage.setItem(_accessToken, accessToken);
        localStorage.setItem(_refreshToken, refreshToken);
    },

    getAccessToken(): string {
        return localStorage.getItem(_accessToken) || "";
    },

    getRefreshToken(): string {
        return localStorage.getItem(_refreshToken) || "";
    }
}