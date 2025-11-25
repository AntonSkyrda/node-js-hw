interface ITokenData {
    accessToken: string;
    refreshToken: string;
}

export interface IToken {
    tokens: ITokenData;
}