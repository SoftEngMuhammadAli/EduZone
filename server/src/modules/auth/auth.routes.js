import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  getUserProfile,
  assignUserRole,
} from "./auth.controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../shared/middlewares/auth_middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/profile", checkAuth, getUserProfile);

// Admin Route to Assing Roles
router.put(
  "/admin/assign-role",
  checkAuth,
  authorizeRoles("admin"),
  assignUserRole,
);

export default router;
