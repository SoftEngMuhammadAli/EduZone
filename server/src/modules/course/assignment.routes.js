import express from "express";
import {
  createAssignment,
  getAllAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment,
} from "./assignment.controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../shared/middlewares/auth_middleware.js";

const router = express.Router();

router.get("/", checkAuth, getAllAssignments);
router.get("/:id", checkAuth, getAssignmentById);

router.post(
  "/",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  createAssignment,
);
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  updateAssignment,
);
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  deleteAssignment,
);

export default router;
