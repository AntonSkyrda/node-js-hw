import { IBase } from "./base.interface";

export interface IPizza extends IBase {
    _id: string;
    name: string;
    price: number;
    diameter: number;
}

export interface IPizzaQuery {
    itemsPerPage: number;
    page: number;
    name?: string;
    price?: number;
    diameter?: number;
    orderBy?: string;
}

export type IPizzaCreateDTO = Pick<IPizza, "name" | "price" | "diameter">;
