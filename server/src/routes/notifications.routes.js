import express from "express";
import {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
} from "../controllers/notifications.controller.js";
import { checkAuth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/", checkAuth, createNotification);
router.get("/me", checkAuth, (req, _res, next) => {
  req.params.userId = req.user._id.toString();
  next();
}, getNotificationsByUser);
router.get("/:userId", checkAuth, getNotificationsByUser);
router.put("/:id/read", checkAuth, markNotificationAsRead);

export default router;
