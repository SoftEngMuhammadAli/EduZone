import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  assignUserRole,
  refreshAccessToken,
} from "../controllers/auth.controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../middlewares/auth_middleware.js";
import validateRequest from "../middlewares/validate_request.js";
import {
  validateLoginBody,
  validateRegisterBody,
} from "../validators/auth.validators.js";
import { createRateLimiter } from "../middlewares/security_middleware.js";

const router = express.Router();

const authLimiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 40 });

router.post("/register", authLimiter, validateRequest(validateRegisterBody), registerUser);
router.post("/login", authLimiter, validateRequest(validateLoginBody), loginUser);
router.post("/refresh", refreshAccessToken);

router.post("/logout", checkAuth, logoutUser);

router.get("/profile", checkAuth, getUserProfile);

// Admin Route to Assing Roles
router.put(
  "/admin/assign-role",
  checkAuth,
  authorizeRoles("admin"),
  assignUserRole,
);

export default router;
