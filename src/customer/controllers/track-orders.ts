import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
const app = express();
app.use(express.json());

const trackOrdersQuery = () => {
  return `SELECT id,track_date ,
  message, location 
  FROM shipment 
  WHERE order_id = ?`;
};

const trackOrders = async (req: Request, res: Response) => {
  const order_id: any = req.query.order_id;
  const query = await queryExecuter(trackOrdersQuery(), order_id, res);
  query.length
    ? await response(201, true, query, "Your Orders", res)
    : await response(201, true, "", "Order yet to dispatch", res);
  // await response(200, true, query, "Your Orders", res);
};

export { trackOrders };
