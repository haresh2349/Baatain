import { NextFunction, Request, Response } from "express";

export const AsyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>
      console.log(err, "error")
    );
  };
};
