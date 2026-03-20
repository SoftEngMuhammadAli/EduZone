import Notification from "../models/notifications.model.js";
import { catchAsyncHandler } from "../middlewares/error_middleware.js";

export const createNotification = catchAsyncHandler(async (req, res) => {
  try {
    const { userId, message, type, link } = req.body;

    if (!message) {
      return res
        .status(400)
        .json({ error: "Message is required" });
    }

    const notify = new Notification({
      userId: userId ?? req.user?._id ?? null,
      message: message,
      type: type,
      link: link,
    });

    if (!notify) {
      return res.status(500).json({ error: "Failed to create notification" });
    }

    await notify.save();

    return res.status(201).json({ message: "Notification sent", data: notify });
  } catch (error) {
    console.error("Error creating notification:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});

export const getNotificationsByUser = catchAsyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const requesterId = req.user?._id?.toString();
    const isAdmin = req.user?.user_type === "admin";

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!isAdmin && requesterId !== userId) {
      return res.status(403).json({ error: "Forbidden access" });
    }

    const notifications = await Notification.find({ userId })
      .sort({
        createdAt: -1,
      })
      .populate("userId", "name email user_type");

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for this user" });
    }

    return res.status(200).json({ data: notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});

export const markNotificationAsRead = catchAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user?._id?.toString();
    const isAdmin = req.user?.user_type === "admin";

    const notification = await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    if (!isAdmin && notification.userId?.toString() !== requesterId) {
      return res.status(403).json({ error: "Forbidden access" });
    }

    notification.isRead = true;
    await notification.save();

    return res
      .status(200)
      .json({ message: "Notification marked as read", data: notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return res
      .status(500)
      .json({ error: "Server error", message: error.message });
  }
});
