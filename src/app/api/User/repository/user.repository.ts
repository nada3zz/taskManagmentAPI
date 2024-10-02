import prisma from "../../../../utils/prisma";
import { IUserData } from "../interfaces/IUserData";
import { User } from "@prisma/client";

class UserRepository {
  async create(data: IUserData): Promise<any> {
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findUser(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

}

export default new UserRepository();
