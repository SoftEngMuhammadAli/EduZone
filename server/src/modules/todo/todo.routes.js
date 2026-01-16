import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "./todo.controller.js";
import { checkAuth } from "../../shared/middlewares/auth/auth_middleware.js";

const router = express.Router();

router.get("/", checkAuth, getTodos);

router.post("/", checkAuth, createTodo);

router.put("/:id", checkAuth, updateTodo);

router.delete("/:id", checkAuth, deleteTodo);

export default router;
