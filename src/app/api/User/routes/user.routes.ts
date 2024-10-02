import { Router } from "express";
import { validator } from "../../../middlewares/validator.middleware";
import { controller } from "../../../middlewares/controller.middleware";
import userController from ".././controllers/user.controller";
import { userValidation } from ".././schema/user.schema";

const router = Router();

const baseRoute = "/users";

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



export const userBaseRoute = baseRoute;
export const userRoutes = router;

