import express from "express";
import {
  createComment,
  getCommentsByCourse,
  getAllComments,
} from "../controllers/comments.controller.js";
import { checkAuth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.get("/all", checkAuth, getAllComments);

router.post("/:courseId", checkAuth, createComment);
router.get("/:courseId", getCommentsByCourse);

export default router;
