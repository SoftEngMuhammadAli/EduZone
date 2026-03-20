import express from "express";
import {
  getAdminAnalytics,
  getInstructorAnalytics,
  getStudentAnalytics,
} from "../controllers/analytics.controller.js";
import {
  authorizeRoles,
  checkAuth,
} from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/admin", checkAuth, authorizeRoles("admin"), getAdminAnalytics);
router.get(
  "/instructor",
  checkAuth,
  authorizeRoles("instructor", "admin"),
  getInstructorAnalytics,
);
router.get(
  "/student",
  checkAuth,
  authorizeRoles("student", "admin", "instructor"),
  getStudentAnalytics,
);

export default router;
