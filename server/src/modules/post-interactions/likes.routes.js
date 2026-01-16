import express from "express";
import { toggleLike, getLikesByCourse } from "./likes.controller.js";
import { checkAuth } from "../../shared/middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post("/:courseId", checkAuth, toggleLike);
router.get("/:courseId", checkAuth, getLikesByCourse);

export default router;
