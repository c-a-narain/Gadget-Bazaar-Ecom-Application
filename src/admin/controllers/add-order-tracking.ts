import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { tokenChecker } from "../../middleware/token-validator";
import { errorHandler } from "../../helpers/error-handler";
import { response } from "../../helpers/response";
const app = express();
app.use(express.json());

const addOrderTrackingQuery = () => {
  return `INSERT INTO 
  shipment(order_id,message,location)
  VALUES (?)`;
};

const addOrderTracking = async (req: Request, res: Response) => {
  try {
    const { order_id, message, location } = req.body;
    const values: string[] = [order_id, message, location];

    await queryExecuter(addOrderTrackingQuery(), [values], res);
    await response(200, true, "", "Tracking Updated Successfully", res);
  } catch (err: any) {
    new errorHandler(404, false, err, "Values not found", res);
  }
};

export { addOrderTracking };
