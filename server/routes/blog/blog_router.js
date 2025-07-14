import express from "express";
const router = express.Router();

import {
  checkAuth,
  authorizeRoles,
} from "../../middlewares/auth/auth_middleware.js";

import { upload } from "../../middlewares/multer.js";

import {
  handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById,
} from "../../controllers/blog/blog_controller.js";

import {
  handleGetAllBlogCategories,
  handleGetBlogCategoryById,
  createBlogCategory,
  handleUpdateBlogCategoryById,
  handleDeleteBlogCategoryById,
} from "../../controllers/blog/blog_categories_controller.js";

// ========== BLOG CATEGORY ROUTES ==========
// GET all categories
router.get("/categories", checkAuth, handleGetAllBlogCategories);

// GET single category by ID
router.get("/categories/:id", checkAuth, handleGetBlogCategoryById);

// CREATE new category
router.post(
  "/categories",
  checkAuth,
  authorizeRoles("admin"),
  createBlogCategory
);

// UPDATE category by ID
router.put(
  "/categories/:id",
  checkAuth,
  authorizeRoles("admin"),
  handleUpdateBlogCategoryById
);

// DELETE category by ID
router.delete(
  "/categories/:id",
  checkAuth,
  authorizeRoles("admin"),
  handleDeleteBlogCategoryById
);

// ========== BLOG ROUTES ==========
// GET all blogs
router.get("/", checkAuth, handleGetAllBlogs);

// GET blog by ID
router.get("/:id", checkAuth, handleGetBlogById);

// CREATE blog
router.post(
  "/",
  checkAuth,
  authorizeRoles("admin"),
  upload.array("images", 5),
  handleCreateBlog
);

// UPDATE blog by ID
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin"),
  upload.array("images", 5),
  handleUpdateBlogById
);

// DELETE blog by ID
router.delete("/:id", checkAuth, authorizeRoles("admin"), handleDeleteBlogById);

export default router;
