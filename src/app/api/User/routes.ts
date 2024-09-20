import { Router } from "express";
import { validator } from "../../middlewares/validator";
import { controller } from "../../middlewares/controller";
import userController from "./controllers";
import { userValidation } from "./schema";

const router = Router();

const baseRoute = "/auth";

router.post(
  "/register",
  validator(userValidation),
  controller(userController.register)
);

router.post(
  "/login",
  validator(userValidation),
  controller(userController.logIn)
);

router.get(
  "/users/:id/tasks",
  controller(userController.findUserTasks)
);

export const userBaseRoute = baseRoute;
export const userRoutes = router;

