import express from "express";
import { toggleLike, getLikesByCourse } from "../controllers/likes.controller.js";
import { checkAuth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/:courseId", checkAuth, toggleLike);
router.get("/:courseId", getLikesByCourse);

export default router;
