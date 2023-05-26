import { errorHandler } from "../helpers/error-handler";
import { tokenValidator } from "./jwt-validation";
import { Request, Response } from "express";

const tokenChecker = async (req: Request, res: Response) => {
  try {
    const token: string = req.headers.authorization!.split(" ")[1];
    const decode = await tokenValidator(token);
    return decode;
  } catch (err: any) {
    new errorHandler(401, false, err, "Token Generation Failed", res);
  }
};

export { tokenChecker };
