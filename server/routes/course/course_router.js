import express from "express";
const router = express.Router();

import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";

import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
} from "../../controllers/course/course_controller.js";

import {
  handleGetAllCourseCategories,
  handleGetCourseCategoryById,
  createCourseCategory,
  handleUpdateCourseCategoryById,
  handleDeleteCourseCategoryById,
} from "../../controllers/course/course_category_controller.js";

import {
  enrollInCourse,
  unEnrollFromCourse,
  getEnrolledCoursesByUserId,
  getEnrolledCoursesByStudentName,
  getAllEnrolledStudents,
  updateCourseEnrollment,
} from "../../controllers/course/enrollment_controller.js";

import { upload } from "../../middlewares/multer.js";

//--///////////////////////////////////////////////
// Course Categories Routes
//--///////////////////////////////////////////////
router.get("/categories", checkAuth, handleGetAllCourseCategories);
router.get("/categories/:id", checkAuth, handleGetCourseCategoryById);
router.post(
  "/categories",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  createCourseCategory
);
router.put(
  "/categories/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleUpdateCourseCategoryById
);
router.delete(
  "/categories/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  handleDeleteCourseCategoryById
);

//--///////////////////////////////////////////////
// Course Routes
//--///////////////////////////////////////////////
router.get("/", checkAuth, getAllCourses);
router.get("/:id", checkAuth, getCourseById);
router.post(
  "/",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  upload.single("image"),
  createCourse
);
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  updateCourseById
);
router.delete(
  "/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  deleteCourseById
);

//--///////////////////////////////////////////////
// Enrollment Routes
//--///////////////////////////////////////////////
router.post("/user/enrollments", checkAuth, enrollInCourse);

router.get("/user/enrollments/:userId", checkAuth, getEnrolledCoursesByUserId);

router.get(
  "/user/enrollments/search/:name",
  checkAuth,
  getEnrolledCoursesByStudentName
);

router.get(
  "/user/enrollments",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  getAllEnrolledStudents
);

router.put(
  "/user/enrollments/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  updateCourseEnrollment
);

router.delete(
  "/user/enrollments/:id",
  checkAuth,
  authorizeRoles("admin", "instructor"),
  unEnrollFromCourse
);

export default router;
