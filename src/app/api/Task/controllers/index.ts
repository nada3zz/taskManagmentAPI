import { Request, Response } from "express";
import taskService from "../services";
import { AuthenticatedRequest } from "../../../middlewares/isAuthenticated";

class TaskController {
  async getAllTasks(req: AuthenticatedRequest, res: Response) {
    const { page, limit, search, sortOrder } = req.query; 
    const result = await taskService.getAllTasks({
      page: Number(page) || 1,
      limit: Number(limit) || 5,
      search: search as string,
      sortOrder: sortOrder as "asc" | "desc" || "asc",
    });
    ;
    return res.json(result);
  }

  async getTask(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const { data } = await taskService.getTask(+id);
    return res.json(data);
  }

  async addTask(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const data = req.body;
    const userId = req.user?.id;
    console.log("req.user?", req.user);
    const result = await taskService.addTask(data, userId);
    return res.json(result);
  }

  async updateTask(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;
    const result = await taskService.updateTask(+id, data);
    return res.json(result);
  }

  async delete(req: AuthenticatedRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await taskService.deleteTask(+id);
    return res.json(result);
  }
}

export default new TaskController();
