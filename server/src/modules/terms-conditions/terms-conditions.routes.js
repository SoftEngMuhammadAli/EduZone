import express from "express";
const router = express.Router();
import {
  getTermsAndConditions,
  createTermsAndConditions,
  updateTermsAndConditions,
  deleteTermsAndConditions,
} from "./terms-conditions.controller.js";
import {
  checkAuth,
  authorizeRoles,
} from "../../shared/middlewares/auth_middleware.js";

router.get("/", checkAuth, getTermsAndConditions);

router.post("/", checkAuth, authorizeRoles("admin"), createTermsAndConditions);

router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin"),
  updateTermsAndConditions,
);

router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin"),
  deleteTermsAndConditions,
);

export default router;
