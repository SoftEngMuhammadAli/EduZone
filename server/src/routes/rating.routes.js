import express from "express";
import {
  createRating,
  getAllRatings,
  getRatingsByCourse,
  deleteRating,
} from "../controllers/rating.controller.js";
import { checkAuth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/", checkAuth, createRating);

router.get("/", getAllRatings);

router.get("/course/:courseId", getRatingsByCourse);

router.delete("/:id", checkAuth, deleteRating);

export default router;
