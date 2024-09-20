import { Request, Response } from "express";
import userService from "../services/index";
import { AuthenticatedRequest } from "../../../middlewares/isAuthenticated";

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

  async findUserTasks(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;  //TODO handle error 
    const data = await userService.findUserTasks(+id);
    return { data };
  }
}

export default new UserController();
