import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
import md5 from "md5";

import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import {
  refreshTokenGenerator,
  tokenGenerator,
} from "../../middleware/jwt-validation";
import { loginTypes } from "../../interfaces/loginTypes";
import { queryOut } from "../../interfaces/queryOutTypes";
import { errorHandler } from "../../helpers/error-handler";

const loginQuery = () => {
  return `SELECT ut.type FROM user_type ut 
  INNER JOIN users u 
  ON ut.id = u.type_id 
  WHERE email = ? AND password = ?;`;
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: loginTypes = req.body;
    const type: queryOut[] = await queryExecuter(
      loginQuery(),
      [email, md5(password)],
      res
    );

    if (type.length > 0) {
      const token = await tokenGenerator(email, type[0].type as string);
      /*       const refreshToken = await refreshTokenGenerator(
        email,
        type[0].type as number,
        res
      ); */
      await response(
        201,
        true,
        token as string,
        // [token as string, refreshToken as string],
        "login success",
        res
      );
    } else {
      await response(406, false, "Nil", "Invalid Credentials", res);
    }
  } catch (err: any) {
    throw new errorHandler(401, false, err, "Error Occured", res);
  }
};

export { login };
