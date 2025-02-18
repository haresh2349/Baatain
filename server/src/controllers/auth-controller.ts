import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../utils/common-utils";
import { AuthDTO } from "../dto/auth-DTO";
import { validate } from "class-validator";
import { AuthService } from "../services/auth-service";
import { UserDTO } from "../dto/user-DTO";

export class AuthController {
  static async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const authDTO = new AuthDTO();
      Object.assign(authDTO, req.body);

      const errors = await validate(authDTO);
      if (errors?.length > 0) {
        console.log(errors, "errors");
      }

      const result = await AuthService.login(authDTO);
      res.status(200).json({ message: "Login successful", ...result });
    } catch (error) {
      // next(error)
      console.log(error, "login error");
    }
  }

  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO = new UserDTO();
      Object.assign(userDTO, req.body);
      const errors = await validate(userDTO);

      if (errors?.length > 0) {
        return res.status(400).json({ errors });
      }

      const user = await AuthService.signup(userDTO);

      return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      //   return res.status(400).json({ message: error?.message });
      next(error);
    }
  }
}
