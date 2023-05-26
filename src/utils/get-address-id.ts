import { Request, Response } from "express";
import { queryOut } from "../interfaces/queryOutTypes";
import { queryExecuter } from "./connection";

const getAddressId = async (req: Request, res: Response, user_id: number) => {
  let address_Id: queryOut[] = await queryExecuter(
    "SELECT id FROM address WHERE user_id = ?",
    [user_id],
    res
  );
  return address_Id[0].id;
};

export { getAddressId };
