import { Router } from "express";
import { taskBaseRoute, taskRoutes } from "../Task/routes/task.routes";
import { userBaseRoute, userRoutes } from "../User/routes/user.routes";

const baseRouter = Router();

baseRouter.use(taskBaseRoute, taskRoutes);
baseRouter.use(userBaseRoute, userRoutes);

export const apiBaseRouter = baseRouter;
