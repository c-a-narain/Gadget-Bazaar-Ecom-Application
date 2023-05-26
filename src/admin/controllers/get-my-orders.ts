import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";
const app = express();
app.use(express.json());

const getMyOrdersQuery = () => {
  return `SELECT o.id, p.product_name,p.product_model,p.product_price,
  o.placed_date, o.shipment_status ,o.delivery_status 
  FROM products p
  INNER JOIN orders o ON p.id = o.product_id 
  WHERE p.seller_id = ? 
  ORDER BY o.id DESC;`;
};

const getMyOrders = async (req: Request, res: Response) => {
  const seller_id = await getUserId(req, res);
  const query = await queryExecuter(getMyOrdersQuery(), [seller_id], res);
  await response(200, true, query, "Your Orders", res);
};

export { getMyOrders };
