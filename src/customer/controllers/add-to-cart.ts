import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";
const app = express();
app.use(express.json());

const addToCartQuery = () => {
  return `INSERT INTO cart
   (product_id,user_id)
    VALUES (?,?);`;
};

const addToCart = async (req: Request, res: Response) => {
  const product_id: number = req.body.product_id; 
  const user_id = await getUserId(req, res);
  await queryExecuter(addToCartQuery(), [product_id, user_id], res);
  await response(201, true, "", "Added to Cart", res);
};

export { addToCart };
