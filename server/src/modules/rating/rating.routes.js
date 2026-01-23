import express from "express";
import {
  createRating,
  getAllRatings,
  getRatingsByCourse,
  deleteRating,
} from "./rating.controller.js";
import { checkAuth } from "../../shared/middlewares/auth_middleware.js";

const router = express.Router();

router.post("/", checkAuth, createRating);

router.get("/", checkAuth, getAllRatings);

router.get("/course/:courseId", checkAuth, getRatingsByCourse);

router.delete("/:id", checkAuth, deleteRating);

export default router;
