import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { tokenChecker } from "../../middleware/token-validator";
import { errorHandler } from "../../helpers/error-handler";
import { response } from "../../helpers/response";
const app = express();
app.use(express.json());

const updateShipmentQuery = () => {
  return `UPDATE orders
    SET shipment_status = true 
    WHERE id = ?`;
};

const addShipmentStatus = async (req: Request, res: Response) => {
  try {
    const order_id = req.query.id;
    await queryExecuter(updateShipmentQuery(), order_id, res);
    await response(200, true, "", "Shippment Status updated", res);
  } catch (err: any) {
    throw new errorHandler(404, false, err, "", res);
  }
};

export { addShipmentStatus };
