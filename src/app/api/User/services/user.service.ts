import userRepo from "../repository/user.repository";
import { encryptPassword, comparePassword } from "../../../../utils/bcrypt";
import { signJwt } from "../../../../utils/jwt";
import { BadRequestException } from "../../../../utils/exceptions";
import { IUserData } from "../interfaces/IUserData";

class UserService {
  async register(
    username: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const findUser = await userRepo.findUser(username);
    if (findUser) throw new BadRequestException("This username already exists");
    const hashedPassword = await encryptPassword(password);
    const newUser: IUserData = {
      username,
      password: hashedPassword,
    };
    const user = await userRepo.create(newUser);
    const accessToken = signJwt({ username: user.username, id: user.id });
    return { accessToken };
  }

  async logIn(
    username: string,
    password: string
  ): Promise<{ accessToken: string }> {
    const user = await userRepo.findUser(username);
    if (!user || !(await comparePassword(password, user.password))) {
      throw new BadRequestException("Invalid credentials");
    }
    const accessToken = signJwt({ username: user.username, id: user.id });
    return { accessToken };
  }

  async findUserTasks(id: number) {
    const user = await userRepo.findUserById(id);
    if (!user) throw new BadRequestException("This user does not exist");
    const userTasks = await userRepo.findUserTasks(id);
    return { userTasks };
  }
}

export default new UserService();
