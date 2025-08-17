import { verifyToken } from "../utils/jwt.js";
import customError from "../utils/customError.js";
import prisma from "../utils/prisma.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies?.token;
    const authHeader = req.headers.authorization;

    let token = null;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (tokenFromCookie) {
      token = tokenFromCookie;
    } else {
      throw new customError("Token is missing", 401);
    }

    req.user = verifyToken(token);
    next();
  } catch(err) {
    console.log('Error in the middleware authMiddleware');
    if (err instanceof customError) {
      next(new customError(err.message, err.statusCode));
    } else {
      next(new customError('Invalid token', 400));
    }
  }
};

export const authHandler = async (req, res, next) => {
  const { type } = req.user;
  if (type === 'auth_token') {
    next()
  } else {
    next(new customError('Invalid token type', 403));
  }
}

export const organizationHandler = async (req, res, next) => {
  const { id } = req.user;
  const { role } = await prisma.user.findUnique({
    where: { id }
  })
  if (role === 'organization') {
    next()
  } else {
    next(new customError('Organization role only', 403))
  }
}