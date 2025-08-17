import jwt from "jsonwebtoken";
import customError from "../utils/customError.js";

export const getToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
    issuer: process.env.APP_NAME
  });
}

export const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new customError("Token expired", 400);
    } else {
      throw new customError("Authentication error", 400);
    }
  }
};