import { Router } from "express";

import { pizzaController } from "../controllers/pizza.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { PizzaValidator } from "../validators/pizza.validator";

const router = Router();

router.get("/", pizzaController.getAll);
router.get("/:id", commonMiddleware.isIdValid("id"), pizzaController.getById);
router.post(
    "/",
    // authMiddleware.checkAccessToken,
    commonMiddleware.validateBody(PizzaValidator.create),
    pizzaController.create,
);
router.put(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    commonMiddleware.validateBody(PizzaValidator.create),
    pizzaController.update,
);
router.delete(
    "/:id",
    authMiddleware.checkAccessToken,
    authMiddleware.isAdmin,
    commonMiddleware.isIdValid("id"),
    pizzaController.delete,
);

export const pizzaRouter = router;
