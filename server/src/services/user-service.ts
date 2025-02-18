import { AppDataSource } from "../config/database";
import { UserDTO } from "../dto/user-DTO";
import { User, UserStatus } from "../entities/user-entity";
const UserRepository = AppDataSource.getRepository(User);

type LoginResponse = {
  id: number;
  token: string;
};

export class UserService {
  static async fetchAllUsers() {
    return await UserRepository.find();
  }
}
