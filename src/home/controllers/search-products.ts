import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import { errorHandler } from "../../helpers/error-handler";
const app = express();
app.use(express.json());

const searchProductsQuery = () => {
  return `SELECT id,product_name,product_model,seller_id,availability,
    rating,category_id,product_price,description,is_active 
    FROM products WHERE is_active = true AND product_name LIKE ? `;
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const searchItem: string = req.query.search + "%";
    const query = await queryExecuter(searchProductsQuery(), [searchItem], res);
    query.length > 0
      ? await response(200, true, query, "Search Result", res)
      : await response(404, false, "", "No data Found", res);
  } catch (err: any) {
    new errorHandler(400, false, err, "Bad Request", res);
  }
};

// const searchOrders = async (req: Request, res: Response) => {};

export { searchProducts };
