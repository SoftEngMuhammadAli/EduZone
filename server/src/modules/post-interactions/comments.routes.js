import express from "express";
import {
  createComment,
  getCommentsByCourse,
  getAllComments,
} from "./comments.controller.js";
import { checkAuth } from "../../shared/middlewares/auth_middleware.js";

const router = express.Router();

router.get("/all", checkAuth, getAllComments);

router.post("/:courseId", checkAuth, createComment);
router.get("/:courseId", checkAuth, getCommentsByCourse);

export default router;
