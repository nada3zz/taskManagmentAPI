import taskRepo from "../repository";
import { BadRequestException } from "../../../../utils/exceptions";
import { Task } from '@prisma/client'; 
import { IAddTaskData } from "../interfaces/IAddTask";
import { IUpdateTaskData } from "../interfaces/IUpdateTask";
import { IFindAllTasks } from "../interfaces/IFindAllTasks";


class TaskService {

  async getAllTasks(options: IFindAllTasks): Promise<{ data: Task[] }> {
    const tasks = await taskRepo.findAll(options);
    return {
      data: tasks,
    };
  }

  async getTask(id: number): Promise<{ data: Task }> {
    const task = await this._findTask(id);
    return { data: task };
  }

  async addTask(data: IAddTaskData, userId: number): Promise<{ data: string }> {
    await taskRepo.create(data, userId);
    return { data: 'Task has been added successfully' };
  }

  async updateTask(id : number, data: IUpdateTaskData): Promise<{ data: string }> {
    await this._findTask(id);
    await taskRepo.update(id, data);
    return { data: 'Task has been updated successfully' };
  }

  async deleteTask(id: number): Promise<{ data: {} }> {
    await this._findTask(id)
    await taskRepo.delete(id);
    return { data: 'Task has been deleted successfully' };
  }

  private async _findTask(id: number): Promise<Task> {
    const task = await taskRepo.findById(id)
    if (!task) throw new BadRequestException("This task does not exist");
    return task;
  }
  
}

export default new TaskService();

