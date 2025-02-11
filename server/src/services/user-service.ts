import { AppDataSource } from "../config/database";
import { UserDTO } from "../dto/user-DTO";
import { User, UserStatus } from "../entities/user-entity";
const UserRepository = AppDataSource.getRepository(User);

type LoginResponse = {
  id: number;
  token: string;
};

export class UserService {
  static async register(userData: UserDTO): Promise<User> {
    const { username, email, password, profilePhoto } = userData;

    const existingUser = await UserRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new Error("Email is already registered");
    }

    const user = await UserRepository.create({
      username,
      email,
      password,
      profilePhoto,
      status: UserStatus.OFFLINE,
    });
    return await UserRepository.save(user);
  }

  static async fetchAllUsers() {
    return await UserRepository.find();
  }
}
