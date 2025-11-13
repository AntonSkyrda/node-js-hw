import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddlewares } from "../middlewares/common.middlewares";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", commonMiddlewares.isIdValid("id"), userController.getById);
router.post(
    "/",
    commonMiddlewares.validateBody(UserValidator.create),
    userController.create,
);
router.put(
    "/:id",
    commonMiddlewares.isIdValid("id"),
    commonMiddlewares.validateBody(UserValidator.update),
    userController.update,
);
router.delete("/:id", commonMiddlewares.isIdValid("id"), userController.delete);

export const userRouter = router;
