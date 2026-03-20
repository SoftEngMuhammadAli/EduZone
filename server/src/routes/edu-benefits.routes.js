import express from "express";
const router = express.Router();
import {
  checkAuth,
  authorizeRoles,
} from "../middlewares/auth_middleware.js";
import {
  handleBenefitByGetAll,
  handleBenefitById,
  createBenefit,
  handleUpdateBenefitById,
  handleDeleteBenefitById,
} from "../controllers/edu-benefits.controller.js";

router.get("/all", checkAuth, handleBenefitByGetAll);

router.get("/:id", checkAuth, authorizeRoles("admin"), handleBenefitById);

router.post("/create", checkAuth, authorizeRoles("admin"), createBenefit);

router.put("/:id", checkAuth, authorizeRoles("admin"), handleUpdateBenefitById);

router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin"),
  handleDeleteBenefitById,
);

export default router;
