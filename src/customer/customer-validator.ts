import express, { NextFunction, Request, Response } from "express";
import { tokenChecker } from "../middleware/token-validator";
import { errorHandler } from "../helpers/error-handler";
const app = express();
app.use(express.json());

const customerValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decode = await tokenChecker(req, res);

    if (Object(decode).type !== "Customer") {
      throw new Error("Unauthorized");
    } else {
      next();
    }
  } catch (err: any) {
    new errorHandler(401, false, err, "", res);
  }
};

export { customerValidator };
