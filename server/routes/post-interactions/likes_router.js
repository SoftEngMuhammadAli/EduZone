import express from "express";
import {
  toggleLike,
  getLikesByCourse,
} from "../../controllers/post-interactions/likes_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post("/:courseId", checkAuth, toggleLike);
router.get("/:courseId", checkAuth, getLikesByCourse);

export default router;
