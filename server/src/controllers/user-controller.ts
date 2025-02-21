import { NextFunction, Request, Response } from "express-serve-static-core";
import { instanceToPlain } from "class-transformer";
import { validate } from "class-validator";
import { UserService } from "../services/user-service";
import { AuthService } from "../services/auth-service";
import { APIError } from "../utils/api-error";

export class UserController {
  static async fetchAllUsers(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15;

    if (limit < 1 || page < 1) {
      return next(new APIError(400, "Invalid page or limit value"));
    }
    const skip = (page - 1) * limit;
    const [users, total] = await UserService.fetchAllUsers(skip, limit);
    return res.status(200).json({
      message: "users fetched successfully.",
      result: {
        totalDataCount: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        data: instanceToPlain(users),
      },
    });
    res.send(users);
  }
}
