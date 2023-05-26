import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { tokenChecker } from "../../middleware/token-validator";
import { errorHandler } from "../../helpers/error-handler";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";
const app = express();
app.use(express.json());

const removeProductQuery = () => {
  return `UPDATE products 
  SET is_active = 0 
  WHERE id = ? 
  AND seller_id = ?;`;
};

const removeProduct = async (req: Request, res: Response) => {
  const product_id: any = req.query.id;
  const seller_id = await getUserId(req, res);
  await queryExecuter(removeProductQuery(), [product_id, seller_id], res);
  await response(200, true, "", "Product removed Successfully", res);
};

export { removeProduct };
