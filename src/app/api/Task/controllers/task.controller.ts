import { Request, Response } from "express";
import taskService from "../services/task.service";
import { AuthenticatedRequest } from "../../../middlewares/isAuthenticated.middleware";

class TaskController {
  async getAllTasks(req: AuthenticatedRequest, res: Response) {
    const { page, limit, search, sortOrder } = req.query;
    const userId = req.user?.id;
    const tasks = await taskService.getAllTasks(
      {
        page: Number(page) || 1,
        limit: Number(limit) || 5,
        search: search as string,
        sortOrder: (sortOrder as "asc" | "desc") || "asc",
      },
      userId
    );
    return tasks;
  }

  async getTask(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const { data } = await taskService.getTask(+id, userId);
    return { data };
  }

  async addTask(req: AuthenticatedRequest, res: Response) {
    const data = req.body;
    const userId = req.user?.id;
    const result = await taskService.addTask(data, +userId);
    return result ;
  }
  async updateTask(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { id } = req.params;
    const data = req.body;
    const userId = req.user?.id;
    const result = await taskService.updateTask(+id, data, userId);
    return result;
  }

  async delete(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const result = await taskService.deleteTask(+id, userId);
    return result;
  }
}

export default new TaskController();
