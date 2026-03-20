import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import { verifyAccessToken } from "../utils/token.js";

const extractToken = (req) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.split("Bearer ")[1];
  }

  if (req.cookies?.access_token) {
    return req.cookies.access_token;
  }

  if (req.cookies?.token) {
    return req.cookies.token;
  }

  return null;
};

async function attachUserFromToken(req, res, next, { required = true } = {}) {
  const token = extractToken(req);

  if (!token) {
    if (!required) return next();
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided.",
    });
  }

  try {
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found for this token.",
      });
    }

    req.user = user;
    return next();
  } catch (error) {
    if (!required) return next();

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Access token expired.",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid access token.",
    });
  }
}

function checkAuth(req, res, next) {
  return attachUserFromToken(req, res, next, { required: true });
}

function optionalAuth(req, res, next) {
  return attachUserFromToken(req, res, next, { required: false });
}

function authorizeRoles(...rolesAuthorization) {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user found in request.",
      });
    }

    if (!rolesAuthorization.includes(user.user_type)) {
      return res.status(403).json({
        success: false,
        message: `Access denied for role '${user.user_type}'.`,
        allowedOnlyFor: rolesAuthorization,
      });
    }

    return next();
  };
}

export { checkAuth, optionalAuth, authorizeRoles };
