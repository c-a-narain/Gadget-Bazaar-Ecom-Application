import { Request, Response } from "express";
import { queryOut } from "../interfaces/queryOutTypes";
import { tokenChecker } from "../middleware/token-validator";
import { queryExecuter } from "./connection";

const getUserId = async (req: Request, res: Response) => {
  const decode = await tokenChecker(req, res);
  const user_id: queryOut[] = await queryExecuter(
    "SELECT id FROM users WHERE email = ?",
    [Object(decode).email],
    res
  );
  return user_id[0].id;
};


export { getUserId };

