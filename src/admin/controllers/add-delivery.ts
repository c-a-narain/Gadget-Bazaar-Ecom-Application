import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { tokenChecker } from "../../middleware/token-validator";
import { errorHandler } from "../../helpers/error-handler";
import { response } from "../../helpers/response";
const app = express();
app.use(express.json());

const addDeliveryQuery = () => {
  return `UPDATE orders 
  SET delivery_status = 1 
  WHERE id = ?;`;
};

const addDelivery = async (req: Request, res: Response) => {
  const order_id = req.query.id;
  await queryExecuter(addDeliveryQuery(), [order_id], res);
  await response(200, true, "", "Delivery Status updated", res);
};

export { addDelivery };
