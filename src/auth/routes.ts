import { Response } from "express";
import { login } from "./controller/login";
import { refreshToken } from "./controller/refreshToken";
import { loginValidator, refreshTokenValidator } from "../middleware/validator";

const loginRoutes = require("express").Router();

loginRoutes.post("/", loginValidator, login);
loginRoutes.post("/refresh", refreshTokenValidator, refreshToken);

export { loginRoutes };
