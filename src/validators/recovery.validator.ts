import joi from "joi";

export class RecoveryValidator {
    private static emailField = joi.string().email();

    public static emailValidate = joi.object({
        email: this.emailField.required(),
    });
}
