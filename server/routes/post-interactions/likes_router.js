import express from "express";
import {
  toggleLike,
  getLikesByCourse,
} from "../../controllers/post-interactions/likes_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.put("/toggle/:courseId", checkAuth, toggleLike);
router.get("/course/:courseId", checkAuth, getLikesByCourse);

export default router;
