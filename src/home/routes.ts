import { fetchProducts } from "./controllers/fetch-products";
import { searchProducts } from "./controllers/search-products";

const productRoutes = require("express").Router();

productRoutes.get("/", fetchProducts);
productRoutes.get("/searchProducts", searchProducts);

export { productRoutes };