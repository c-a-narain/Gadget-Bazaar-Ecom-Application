import express from "express";
const app = express();
app.use(express.json());
import cors from "cors";
import { productRoutes } from "./home/routes";
import { loginRoutes } from "./auth/routes";
import { customerRoutes } from "./customer/routes";
import { adminRoutes } from "./admin/routes";
app.use(cors({ origin: "*" }));
const corsOptions = {
  "Access-Control-Allow-Origin": "*",
  optionSuccessStatus: 200,
};

const port = process.env.PORT;

app.use("/", productRoutes);
app.use("/login", loginRoutes);
app.use("/user", customerRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log("App listening on", port);
});
