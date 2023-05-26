import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
import { queryExecuter } from "../../utils/connection";
import { refreshTokenValidator } from "../../middleware/jwt-validation";
import { errorHandler } from "../../helpers/error-handler";
import { response } from "../../helpers/response";

const refreshTokenQuery = () => {
  return `SELECT type_id 
  FROM users 
  WHERE email = ? ;`;
};

const refreshToken = async (req: Request, res: Response) => {
  const email = req.body.email;
  const token = req.body.token;
  try {
    const type = await queryExecuter(refreshTokenQuery(), [email], res);

    const genToken = await refreshTokenValidator(
      email as string,
      type[0].type_id as string,
      token as string,
      res
    );
    await response(201, true, genToken, "New Access Token Generated", res);
  } catch (err: any) {
    throw new errorHandler(400, false, err, "Bad Request", res);
  }
};

export { refreshToken };
