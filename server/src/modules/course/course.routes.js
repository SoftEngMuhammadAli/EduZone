import express from "express";
const router = express.Router();

import {
  checkAuth,
  authorizeRoles,
} from "../../shared/middlewares/auth_middleware.js";

import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} from "./course.controller.js";

import {
  enrollInCourse,
  unEnrollFromCourse,
  getEnrolledCoursesByUserId,
  getEnrolledCoursesByStudentName,
  getAllEnrolledStudents,
  updateCourseEnrollment,
} from "./enrollment.controller.js";

import { upload } from "../../shared/middlewares/multer.js";

//--///////////////////////////////////////////////
// Course Routes
//--///////////////////////////////////////////////
router.get("/", checkAuth, getAllCourses);
router.get("/:id", checkAuth, getCourseById);
router.post(
  "/create-course",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  upload.single("image"),
  createCourse,
);
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  upload.single("image"),
  updateCourseById,
);
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  deleteCourseById,
);

//--///////////////////////////////////////////////
// Enrollment Routes
//--///////////////////////////////////////////////
router.post("/user/enrollments", checkAuth, enrollInCourse);

router.get("/user/enrollments/:userId", checkAuth, getEnrolledCoursesByUserId);

router.get(
  "/user/enrollments/search/:name",
  checkAuth,
  getEnrolledCoursesByStudentName,
);

router.get(
  "/user/enrollments",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  getAllEnrolledStudents,
);

router.put(
  "/user/enrollments/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  updateCourseEnrollment,
);

router.delete(
  "/user/enrollments/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  unEnrollFromCourse,
);

export default router;
