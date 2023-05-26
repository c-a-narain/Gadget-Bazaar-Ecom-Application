import express from "express";
import { Request, Response } from "express";
import { queryExecuter } from "../../utils/connection";
import { response } from "../../helpers/response";
import { errorHandler } from "../../helpers/error-handler";
import { paramsRequest } from "../../interfaces/reqParams";

const app = express();
app.use(express.json());
require("dotenv").config();

const fetchProducts = async (req: Request, res: Response) => {
  try {
    let sqlst = `SELECT id,product_name,
    product_model,seller_id,availability,
    rating,category_id, 
    product_price,description,is_active,imgLink
    FROM products 
    WHERE is_active = true `;

    const reqParams: paramsRequest = {
      offset: req.query.offset,
      rating: req.query.rating,
      type: req.query.type,
      fromPrice: req.query.fromPrice,
      toPrice: req.query.toPrice,
      sort: req.query.sort,
    };

    const values: number[] = [];

    if (reqParams.type) {
      const category_id = await queryExecuter(
        "SELECT id FROM category WHERE category = ? ",
        [reqParams.type],
        res
      );
      sqlst = sqlst + " AND category_id = ? ";
      reqParams.type = category_id[0].id;
      values.push(reqParams.type);
    }
    if (reqParams.rating) {
      sqlst = sqlst + " AND rating = ? ";
      values.push(reqParams.rating);
    }

    if (reqParams.fromPrice && reqParams.toPrice) {
      sqlst =
        sqlst + "AND product_price BETWEEN ? AND ? GROUP BY product_price ";

      values.push(reqParams.fromPrice);
      values.push(reqParams.toPrice);
    }
    // sqlst += " LIMIT 10 ";
    if (reqParams.sort) {
      reqParams.sort === "DESC" || "desc"
        ? (sqlst += " ORDER BY product_name DESC")
        : (sqlst += " ORDER BY product_name");
    }

    if (reqParams.offset) {
      sqlst = sqlst + "OFFSET ?";
      values.push(reqParams.offset);
    }

    const query = await queryExecuter(sqlst, values, res);
    if (query.length > 0) {
      await response(201, true, query, "Fetched Successfully", res);
    } else {
      await response(200, true, query, "No Data Available", res);
    }
  } catch (err: any) {
    new errorHandler(404, false, "Connection Invalid", err, res);
  }
};

export { fetchProducts };
