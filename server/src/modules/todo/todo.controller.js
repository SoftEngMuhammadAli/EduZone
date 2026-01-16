import mongoose from "mongoose";
import { catchAsyncHandler } from "../../shared/middlewares/error_middleware.js";
import Todo from "./todo.model.js";
import Notification from "../notifications/notifications.model.js";

export const getTodos = catchAsyncHandler(async (req, res) => {
  const todos = await Todo.find({}).populate("user", "name email");
  if (!todos || todos.length === 0) {
    return res.status(404).json({ message: "No todos found", data: [] });
  }
  return res.status(200).json({ message: "Todos fetched", data: todos });
});

export const createTodo = catchAsyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text?.trim()) {
    return res
      .status(400)
      .json({ message: "Invalid input: 'text' is required" });
  }

  const todo = new Todo({ text: text.trim(), user: req.user._id });
  const saved = await todo.save();

  await Notification.create({
    userId: req.user._id,
    message: `New todo created: "${saved.text}"`,
    type: "todo",
    link: `/todos/${saved._id}`,
  });

  return res
    .status(201)
    .json({ message: "Todo created successfully", data: saved });
});

export const updateTodo = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  const updated = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updated) {
    return res.status(404).json({ message: "Todo not found" });
  }

  await Notification.create({
    userId: updated.user,
    message: `Todo updated: "${updated.text}"`,
    type: "todo",
    link: `/todos/${updated._id}`,
  });

  return res
    .status(200)
    .json({ message: "Todo updated successfully", data: updated });
});

export const deleteTodo = catchAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid todo ID" });
  }

  const deleted = await Todo.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Todo not found" });
  }

  await Notification.create({
    userId: deleted.user,
    message: `Todo deleted: "${deleted.text}"`,
    type: "todo",
    link: `/todos`,
  });

  return res.status(200).json({
    message: "Todo deleted successfully",
    data: deleted,
  });
});
