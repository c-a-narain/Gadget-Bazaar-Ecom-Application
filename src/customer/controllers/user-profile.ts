import express, { Request, Response } from "express";
import { tokenChecker } from "../../middleware/token-validator";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
const app = express();
app.use(express.json());

const getUserProfileQuery = () => {
  return `SELECT name, email, phone 
  FROM users 
  WHERE email = ?;`;
};

const getUserProfile = async (req: Request, res: Response) => {
  const decode: any = await tokenChecker(req, res);
  const query = await queryExecuter(
    getUserProfileQuery(),
    [Object(decode).email],
    res
  );
  await response(200, true, query, "Your Profile", res);
};

export { getUserProfile };
