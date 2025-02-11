import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../utils/common-utils";
import { AuthDTO } from "../dto/auth-DTO";
import { validate } from "class-validator";
import { AuthService } from "../services/auth-service";

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
}
