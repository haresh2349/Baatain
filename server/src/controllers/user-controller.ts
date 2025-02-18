import { NextFunction, Request, Response } from "express-serve-static-core";
import { UserDTO } from "../dto/user-DTO";
import { validate } from "class-validator";
import { UserService } from "../services/user-service";
import { AuthService } from "../services/auth-service";

export class UserController {
  static async fetchAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await UserService.fetchAllUsers();
    res.send(users);
  }
}
