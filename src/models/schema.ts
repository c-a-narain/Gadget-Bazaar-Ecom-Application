import express from "express";
import Joi from "joi";
const app = express();
app.use(express.json());

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

const refreshSchema = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
});

/* const addProductSchema = Joi.object({
  product_name : Joi.string(),
  product_model : Joi.string(),
  availability,
  rating,
  category_id,
  product_price,
  description,
});
 */
export { loginSchema, refreshSchema };
