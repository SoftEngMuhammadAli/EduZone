import express from "express";
const router = express.Router();

import {
  checkAuth,
  authorizeRoles,
} from "../../shared/middlewares/auth/auth_middleware.js";

import { upload } from "../../shared/middlewares/multer.js";

import {
  handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById,
} from "./blog.controller.js";

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
  upload.single("image"),
  handleCreateBlog,
);

// UPDATE blog by ID
router.put(
  "/:id",
  checkAuth,
  authorizeRoles("admin"),
  upload.single("image"),
  handleUpdateBlogById,
);

// DELETE blog by ID
router.delete("/:id", checkAuth, authorizeRoles("admin"), handleDeleteBlogById);

export default router;
