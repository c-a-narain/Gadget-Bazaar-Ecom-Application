import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";
const app = express();
app.use(express.json());

const removeFromCartQuery = () => {
  return `DELETE FROM cart 
  WHERE product_id = ? 
  AND user_id = ?`;
};

const removeFromCart = async (req: Request, res: Response) => {
  const product_id: number = req.body.product_id;
  const user_id = await getUserId(req, res);
  await queryExecuter(removeFromCartQuery(), [product_id, user_id], res);
  await response(201, true, "", "Removed from Cart", res);
};

export { removeFromCart };
