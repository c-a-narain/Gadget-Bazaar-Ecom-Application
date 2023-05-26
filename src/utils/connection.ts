import express from "express";
import { Response } from "express";
const app = express();
import mysql from "mysql2";
import dotenv from "dotenv";
import { errorHandler } from "../helpers/error-handler";
dotenv.config();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
});

const promisePool = pool.promise();

const queryExecuter = async (sqlst: string, values: any, res: Response) => {
  try {
    const [result] = await promisePool.query(sqlst, values);
    return result;
  } catch (err: any) {
    new errorHandler(400, false, err, "Sql Error", res);
  }
};

export { queryExecuter };
