import { validate } from "class-validator";
import { AppDataSource } from "../config/database";
import { AuthDTO } from "../dto/auth-DTO";
import { User, UserStatus } from "../entities/user-entity";
import jwt from "jsonwebtoken";
import { UserDTO } from "../dto/user-DTO";
interface LoginResponse {
  id: string;
  token: string;
}
const UserRepository = AppDataSource.getRepository(User);
export class AuthService {
  static async login(loginData: AuthDTO): Promise<LoginResponse> {
    const { email, password } = loginData;

    const existingUser = await UserRepository.findOne({ where: { email } });
    if (!existingUser) {
      throw new Error("User does not exists!");
    }

    const isPasswordValid = await existingUser.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid password!");
    }

    const token = jwt.sign(
      { id: existingUser.id, email: email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    return { token, id: existingUser?.id };
  }

  static async signup(userData: UserDTO): Promise<User> {
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
}
