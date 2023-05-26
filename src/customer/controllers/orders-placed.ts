import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";

const ordersPlacedQuery = () => {
  return `SELECT o.id as order_id,p.id,p.product_name, p.product_model,p.rating,p.product_price, p.description 
  FROM products p 
  INNER JOIN orders o 
  ON o.product_id = p.id 
  INNER JOIN users u 
  ON u.id = o.user_id 
  WHERE u.id = ?;`;
};

const app = express();
app.use(express.json());


const ordersPlaced = async (req: Request, res: Response) => {
  const user_id = await getUserId(req, res);
  const query = await queryExecuter(ordersPlacedQuery(), [user_id], res);
  query.length
    ? await response(201, true, query, "Placed Order", res)
    : await response(201, true, "", "No order is placed", res);
};

export { ordersPlaced };
