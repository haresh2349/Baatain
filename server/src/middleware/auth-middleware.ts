import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../utils/common-utils";
import jwt from "jsonwebtoken";
import { APIError } from "../utils/api-error";
import { AppDataSource } from "../config/database";
import { User } from "../entities/user-entity";
const UserRepository = AppDataSource.getRepository(User);

interface TokenPayload extends jwt.JwtPayload {
  id: string;
  email: string;
}
export const isUserLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new APIError(401, "Unauthorized request!");
  }

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    const user = await UserRepository.findOneBy({ id: decodedToken?.id });

    if (!user) {
      throw new APIError(401, "Invali token");
    }

    req.user = { id: decodedToken?.id, email: decodedToken?.email };

    next();
  } catch (error) {
    throw new APIError(401, "Invalid token");
  }
};
