import express from "express";
import {
  createLike,
  getAllLikes,
  getLikeById,
  updateLike,
  deleteLike,
  getLikesByCourse,
} from "../../controllers/post-interactions/likes_controller.js";
import { checkAuth } from "../../middlewares/auth/auth_middleware.js";

const router = express.Router();

router.post("/", checkAuth, createLike);
router.get("/", checkAuth, getAllLikes);
router.get("/course/:courseId", getLikesByCourse);
router.get("/:id", checkAuth, getLikeById);
router.put("/:id", checkAuth, updateLike);
router.delete("/:id", checkAuth, deleteLike);

export default router;
