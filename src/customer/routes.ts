import { addToCart } from "./controllers/add-to-cart";
import { ordersPlaced } from "./controllers/orders-placed";
import { placeOrders } from "./controllers/place-orders";
import { removeFromCart } from "./controllers/remove-from-cart";
import { trackOrders } from "./controllers/track-orders";
import { getUserProfile } from "./controllers/user-profile";
import { viewCart } from "./controllers/view-cart";
import { customerValidator } from "./customer-validator";

const customerRoutes = require("express").Router();

customerRoutes.get("/", getUserProfile);
customerRoutes.post("/addToCart", customerValidator, addToCart);
customerRoutes.get("/cart", customerValidator, viewCart);
customerRoutes.post("/placeOrder", customerValidator, placeOrders);
customerRoutes.get("/trackOrder", customerValidator, trackOrders);
customerRoutes.delete("/removeFromCart", customerValidator, removeFromCart);
customerRoutes.get("/ordersPlaced",ordersPlaced);
export { customerRoutes };
