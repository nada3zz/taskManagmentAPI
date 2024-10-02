import { Request, Response } from "express";
import userService from "../services/user.service";
import { AuthenticatedRequest } from "../../../middlewares/isAuthenticated.middleware";

class UserController {
  async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const data = await userService.register(username, password);
    return { data };
  }

  async logIn(req: Request, res: Response) {
    const { username, password } = req.body;
    const data = await userService.logIn(username, password);
    return { data };
  }

}

export default new UserController();
