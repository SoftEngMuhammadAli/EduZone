import express from "express";
import {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentsByCourse,
} from "../../controllers/post-interactions/comments_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post("/", checkAuth, createComment);
router.get("/", checkAuth, getAllComments);
router.get("/course/:courseId", checkAuth, getCommentsByCourse);
router.get("/:id", checkAuth, getCommentById);
router.put("/:id", checkAuth, updateComment);
router.delete("/:id", checkAuth, deleteComment);

export default router;
