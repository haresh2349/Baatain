import { AppDataSource } from "../config/database";
import { User, UserStatus } from "../entities/user-entity";
const UserRepository = AppDataSource.getRepository(User);

type LoginResponse = {
  id: number;
  token: string;
};

export class UserService {
  static async fetchAllUsers(skip: number, take: number) {
    return await UserRepository.findAndCount({
      skip,
      take,
      order: { createdAt: "DESC" },
    });
  }
}
