import jwt from "jsonwebtoken";
import User from "../../../modules/auth/auth.model.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

async function checkAuth(req, res, next) {
  let token;

  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split("Bearer ")[1];
  }

  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid token: user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Session Expired" });
    }
    return res
      .status(401)
      .json({ message: "Invalid Token", error: error.message });
  }
}

function authorizeRoles(...rolesAuthorization) {
  return (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized: No user found in request",
        });
      }

      if (!rolesAuthorization.includes(user.user_type)) {
        return res.status(403).json({
          errorType: "Authorization Error",
          details: `Access denied for role '${user.user_type}'.`,
          allowedOnlyFor: rolesAuthorization,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
}

export { checkAuth, authorizeRoles };
