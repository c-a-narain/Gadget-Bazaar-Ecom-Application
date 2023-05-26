import express, { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import { getUserId } from "../../utils/get-user-id";
import { getAddressId } from "../../utils/get-address-id";
import { itemType } from "../../interfaces/itemType";

const app = express();
app.use(express.json());

const placeOrdersQuery = () => {
  return `INSERT INTO orders
   (product_id,user_id,address_id)
    VALUES ?`;
};

const updateQuantityQuery = () => {
  return `UPDATE products 
  SET availability = availability - 1 
  WHERE id = ?`;
};

const removeAllFromCartQuery = () => {
  return `DELETE FROM cart
   WHERE user_id = ?`;
};

const getProductIdQuery = () => {
  return `SELECT product_id
   FROM cart
   WHERE user_id = ?`;
};

const placeOrders = async (req: Request, res: Response) => {
  const user_id = await getUserId(req, res);
  const address_id = await getAddressId(req, res, user_id as number);
  let product_id = await queryExecuter(getProductIdQuery(), [user_id], res);

  if (product_id.length > 0) {
    let values: number[] = [user_id as number, address_id as number];
    const inputArray: number[][] = product_id.map((item: itemType) => [
      item["product_id"],
      ...values,
    ]);

    await queryExecuter(placeOrdersQuery(), [inputArray], res);
    await queryExecuter(removeAllFromCartQuery(), [user_id], res);
    product_id.map(async (item: itemType) => {
      await queryExecuter(updateQuantityQuery(), [item.product_id], res);
    });
    await response(200, true, "", "Order Placed", res);
  } else {
    await response(404, false, "", "No Items in cart", res);
  }
};

export { placeOrders };
