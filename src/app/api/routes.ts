import { Router } from "express";
import { taskBaseRoute, taskRoutes } from "../api/Task/routes";
import { userBaseRoute, userRoutes } from "../api/User/routes";

const baseRouter = Router();

baseRouter.use(taskBaseRoute, taskRoutes);
baseRouter.use(userBaseRoute, userRoutes);

export const apiBaseRouter = baseRouter;
