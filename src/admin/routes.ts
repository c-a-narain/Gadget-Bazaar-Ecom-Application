import express from "express";
import { addProducts } from "./controllers/add-products";
import { getMyProducts } from "./controllers/get-my-products";
import { getMyOrders } from "./controllers/get-my-orders";
import { getAllOrders } from "./controllers/get-all-orders";
import { addOrderTracking } from "./controllers/add-order-tracking";
import { removeProduct } from "./controllers/remove-product";
import { addDelivery } from "./controllers/add-delivery";
import { addShipmentStatus } from "./controllers/add-shipping-status";
import { adminValidator } from "./admin-validation";
import { getAllUsers } from "./controllers/view-all-users";

const app = express();
app.use(express.json());

const adminRoutes = require("express").Router();

adminRoutes.post("/addProducts", adminValidator, addProducts);
adminRoutes.get("/myProducts", adminValidator, getMyProducts);
adminRoutes.get("/myOrders", adminValidator, getMyOrders);
adminRoutes.get("/allOrders", adminValidator, getAllOrders);
adminRoutes.post("/addTrack", adminValidator, addOrderTracking);
adminRoutes.patch("/removeProduct", adminValidator, removeProduct);
adminRoutes.patch("/delivery", adminValidator, addDelivery);
adminRoutes.patch("/shipped", adminValidator, addShipmentStatus);
adminRoutes.get("/allUsers", adminValidator, getAllUsers);

export { adminRoutes };
