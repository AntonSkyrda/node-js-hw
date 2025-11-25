import joi from "joi";

export class PizzaValidator {
    private static name = joi.string().min(3).max(20);
    private static price = joi.number().min(1);
    private static diameter = joi.number().min(1);

    public static create = joi.object({
        name: this.name.required(),
        price: this.price.required(),
        diameter: this.diameter.required(),
    });
}
