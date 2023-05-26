import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
const app = express();
app.use(express.json());

const getUsersQuery = () => {
  return `SELECT name,email,phone 
  FROM users 
  WHERE type_id = 2;`;
};

const getAllUsers = async (req: Request, res: Response) => {
  const query = await queryExecuter(getUsersQuery(), "", res);
  await response(200, true, query, "All users", res);
};

export { getAllUsers };
