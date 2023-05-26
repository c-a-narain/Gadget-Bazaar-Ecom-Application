import { Response } from "express";
import { response } from "./response";
class errorHandler extends Error {
  constructor(
    statusCode: number,
    success: boolean,
    message: string,
    data: any,
    res: Response
  ) {
    super(message);
    response(statusCode, success, message, data, res);
  }
}

export { errorHandler };
