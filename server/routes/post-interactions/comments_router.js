import express from "express";
import {
  createComment,
  getCommentsByCourse,
} from "../../controllers/post-interactions/comments_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post("/:courseId", checkAuth, createComment);
router.get("/:courseId", checkAuth, getCommentsByCourse);

export default router;
