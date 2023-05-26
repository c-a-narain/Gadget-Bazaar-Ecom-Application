import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { tokenChecker } from "../../middleware/token-validator";
import { errorHandler } from "../../helpers/error-handler";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";
import { addProducts } from "../../interfaces/addProducts";
const app = express();
app.use(express.json());

const addProductsQuery = () => {
  return `INSERT INTO products 
  (product_name,product_model,availability,rating,category_id,product_price,description,seller_id)
   VALUES (?) ;`;
};

const addProducts = async (req: Request, res: Response) => {
  const {
    product_name,
    product_model,
    availability,
    rating,
    category_id,
    product_price,
    description,
  }: addProducts = req.body;

  const values = [
    product_name,
    product_model,
    availability,
    rating,
    category_id,
    product_price,
    description,
  ];

  const seller_id = await getUserId(req, res);
  values.push(seller_id as number);
  await queryExecuter(addProductsQuery(), [values], res);
  await response(200, true, "", "Product Added", res);
};

export { addProducts };
