import { NextFunction, Request, Response } from "express";
import { loginSchema, refreshSchema } from "../models/schema";
import { errorHandler } from "../helpers/error-handler";

const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
  err: any
) => {
  const result = loginSchema.validate(req.body);

  if (result.error) {
    new errorHandler(401, false, err.message, {}, res);
  } else {
    next();
  }
};

const refreshTokenValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
  err: any
) => {
  const result = refreshSchema.validate(req.body);

  if (result.error) {
    new errorHandler(401, false, err.message, {}, res);
  } else {
    next();
  }
};

export { loginValidator, refreshTokenValidator };
