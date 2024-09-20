import prisma from "../../../../utils/prisma";
import { Task } from "@prisma/client";
import { IAddTaskData } from "../interfaces/IAddTask";
import { IUpdateTaskData } from "../interfaces/IUpdateTask";
import { IFindAllTasks } from "../interfaces/IFindAllTasks";

class TaskRepository{
  async findAll(options: IFindAllTasks = {}) : Promise<any> {
    const { page = 1, limit = 5, search, sortOrder = "asc" } = options;

    const where = search
      ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};

    const [tasks, totalCount] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy: {
          createdAt: sortOrder,
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.task.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      tasks,
      totalCount,
      currentPage: page,
      totalPages,
    };
  }

  async findById(taskId: number): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });
    return task;
  }

  async create(data: IAddTaskData, userId: number): Promise<Task> {
    const task = await prisma.task.create({
      data: {
        ...data,
        assignedTo: { connect: { id: userId } },
      },
    });
    return task;
  }

  async update(taskId: number, data: IUpdateTaskData) {
    const task = await prisma.task.update({
      where: { id: taskId },
      data,
    });
    return task;
  }

  async delete(taskId: number) {
    return await prisma.task.delete({
      where: { id: taskId },
    });
  }
}

export default new TaskRepository();
