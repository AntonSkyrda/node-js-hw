import mongoose, { Schema } from "mongoose";

import { IPizza } from "../interfaces/pizza.interface";

const pizzaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    diameter: {
        type: Number,
        required: true,
    },
});

export const Pizza = mongoose.model<IPizza>("pizza", pizzaSchema);
