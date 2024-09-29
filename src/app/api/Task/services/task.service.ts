import taskRepo from "../repository/task.repository";
import {
  BadRequestException,
  ForbiddenException,
} from "../../../../utils/exceptions";
import { Task } from "@prisma/client";
import { IAddTaskData } from "../interfaces/IAddTask";
import { IUpdateTaskData } from "../interfaces/IUpdateTask";
import { IFindAllTasks } from "../interfaces/IFindAllTasks";

class TaskService {
  async getAllTasks(
    options: IFindAllTasks,
    userId: number
  ): Promise<{ data: Task[] }> {
    const tasks = await taskRepo.findAll(options, userId);
    return {
      data: tasks,
    };
  }

  async getTask(id: number, userId: number): Promise<{ data: Task }> {
    const task = await this._findTask(id, userId);
    return { data: task };
  }

  async addTask(data: IAddTaskData, userId: number): Promise<{ data: string }> {
    await taskRepo.create(data, userId);
    return { data: "Task has been added successfully" };
  }

  async updateTask(
    id: number,
    data: IUpdateTaskData,
    userId: number
  ): Promise<{ data: string }> {
    await this._findTask(id, userId);
    await taskRepo.update(id, data);
    return { data: "Task has been updated successfully" };
  }

  async deleteTask(id: number, userId: number): Promise<{ data: {} }> {
    await this._findTask(id, userId);
    await taskRepo.delete(id);
    return { data: "Task has been deleted successfully" };
  }

  private async _findTask(id: number, userId: number): Promise<Task> {
    const task = await taskRepo.findById(id);
    if (!task) throw new BadRequestException("This task does not exist");
    if (task.userId !== userId) {
      throw new ForbiddenException("You do not have access to this task");
    }
    return task;
  }
}

export default new TaskService();
