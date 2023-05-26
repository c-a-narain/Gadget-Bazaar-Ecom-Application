import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { tokenChecker } from "../../middleware/token-validator";
import { errorHandler } from "../../helpers/error-handler";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";
const app = express();
app.use(express.json());

const getMyProductsQuery = () => {
  return `SELECT p.id,p.product_name,p.product_model,p.availability,c.category,p.rating,p.product_price
  FROM products p 
  INNER JOIN category c ON p.category_id = c.id 
  WHERE p.seller_id = ? 
  AND p.is_active = 1;`;
};

const getMyProducts = async (req: Request, res: Response) => {
  const seller_id = await getUserId(req, res);
  const query = await queryExecuter(getMyProductsQuery(), [seller_id], res);
  await response(200, true, query, "Your Products", res);
};

export { getMyProducts };
