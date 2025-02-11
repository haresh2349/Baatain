import { NextFunction, Request, Response } from "express-serve-static-core";
import { UserDTO } from "../dto/user-DTO";
import { validate } from "class-validator";
import { UserService } from "../services/user-service";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO = new UserDTO();
      Object.assign(userDTO, req.body);
      const errors = await validate(userDTO);

      if (errors?.length > 0) {
        return res.status(400).json({ errors });
      }

      const user = await UserService.register(userDTO);

      return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      //   return res.status(400).json({ message: error?.message });
      next(error);
    }
  }

  static async fetchAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await UserService.fetchAllUsers();
    res.send(users);
  }
}
