import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";

const viewCartQuery = () => {
  return `SELECT p.id,p.product_name, p.product_model,p.rating,p.product_price, p.description 
  FROM products p 
  INNER JOIN cart c 
  ON c.product_id = p.id 
  INNER JOIN users u 
  ON u.id = c.user_id 
  WHERE u.id = ?;`;
};

const app = express();
app.use(express.json());

const viewCart = async (req: Request, res: Response) => {
  const user_id = await getUserId(req, res);
  const query = await queryExecuter(viewCartQuery(), [user_id], res);
  query.length
    ? await response(201, true, query, "Cart Items", res)
    : await response(201, true, "", "No Items in Cart", res);
};

export { viewCart };
