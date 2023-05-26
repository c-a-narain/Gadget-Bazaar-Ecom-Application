import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { response } from "../helpers/response";
import { errorHandler } from "../helpers/error-handler";

const tokenGenerator = async (email: string, type: string) => {
  const token = jwt.sign(
    {
      email: email,
      type: type,
    },
    `${process.env.ACCESSKEY}`,
    { expiresIn: "10h" }
  );
  return token;
};

const tokenValidator = async (tokenData: string) => {
  let decode = jwt.verify(tokenData, `${process.env.ACCESSKEY}`);
  return decode;
};

const refreshTokenGenerator = async (
  email: string,
  type: number,
  res: Response
) => {
  const token = jwt.sign(
    {
      email: email,
      type: type,
    },
    `${process.env.REFRESHKEY}`,
    { expiresIn: "10D" }
  );

  return token;
};

const refreshTokenValidator = async (
  email: string,
  type: string,
  refreshToken: string,
  res: Response
) => {
  return jwt.verify(
    refreshToken,
    `${process.env.REFRESHKEY}`,
    async (err: any) => {
      if (err) {
        await response(404, false, err, "Unauthorized, Login Again", res);
      } else {
        const token: string = await tokenGenerator(email,type);
        return token;
      }
    }
  );
};

export {
  tokenGenerator,
  tokenValidator,
  refreshTokenGenerator,
  refreshTokenValidator,
};
