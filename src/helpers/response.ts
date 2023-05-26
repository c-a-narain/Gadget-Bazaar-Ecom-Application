import { Response } from "express";
const response = async (
  statusCode: number,
  success: boolean,
  data: any,
  message: string,
  res: Response
) => {
  try {
    let responseDisplay = {};
    if (data.length === 0) {
      responseDisplay = {
        success,
        message,
      };
    } else {
      responseDisplay = {
        success,
        message,
        data,
      };
    }
    res.status(statusCode).send(responseDisplay);
  } catch (err: any) {
    console.log(err);
  }
};

export { response };
