import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
const app = express();
app.use(express.json());

const getAllOrdersQuery = () => {
  return `SELECT p.id, p.product_name,p.product_model,p.product_price,o.placed_date,
  u.name,u.email, o.shipment_status,o.delivery_status
  FROM orders o 
  INNER JOIN products p 
  ON p.id = o.product_id 
  INNER JOIN users u 
  ON u.id = o.user_id;`;
};

const getAllOrders = async (req: Request, res: Response) => {
  const query = await queryExecuter(getAllOrdersQuery(), [], res);
  await response(200, true, query, "All Orders", res);
};

export { getAllOrders };
