// ==========================
// User-related Routers
// ==========================
import userRouter from "./auth/users.routes.js";
import attendanceRouter from "./auth/attendance.routes.js";

// ==========================
// Auth Routers
// ==========================
import authRouter from "./auth/auth.routes.js";

// ==========================
// Course-related Routers
// ==========================
import courseRouter from "./course/course.routes.js";
import lessonRouter from "./course/lesson.routes.js";
import assignmentRouter from "./course/assignment.routes.js";

// ==========================
// Educational Benefits
// ==========================
import benefitRouter from "./edu-benefits/edu-benefits.routes.js";

// ==========================
// Blog Routers
// ==========================
import blogRouter from "./blog/blog.routes.js";

// ==========================
// Post Interactions
// ==========================
import commentRouter from "./post-interactions/comments.routes.js";
import likeRouter from "./post-interactions/likes.routes.js";
import ratingRouter from "./rating/rating.routes.js";

// ==========================
// Contact & Info
// ==========================
import contactRouter from "./contact-us/contact-us.routes.js";
import privacyPolicyRouter from "./privacy-policy/privacy-policy.routes.js";
import termsConditionsRouter from "./terms-conditions/terms-conditions.routes.js";

// ==========================
// Utility Routers
// ==========================
import todoRouter from "./todo/todo.routes.js";

// ==========================
// Notifications
// ==========================
import notificationRouter from "./notifications/notifications.routes.js";

const registeredRouters = (app) => {
  // User
  app.use("/api/users", userRouter);
  app.use("/api/attendance", attendanceRouter);

  // Auth
  app.use("/api/auth", authRouter);

  // Courses
  app.use("/api/courses", courseRouter);
  app.use("/api/lessons", lessonRouter);
  app.use("/api/assignments", assignmentRouter);

  // Educational Benefits
  app.use("/api/benefits", benefitRouter);

  // Blog
  app.use("/api/blogs", blogRouter);

  // Post Interactions
  app.use("/api/comments", commentRouter);
  app.use("/api/likes", likeRouter);
  app.use("/api/ratings", ratingRouter);

  // Contact & Info
  app.use("/api/contact", contactRouter);
  app.use("/api/privacy-policy", privacyPolicyRouter);
  app.use("/api/terms-conditions", termsConditionsRouter);

  // Utilities
  app.use("/api/todos", todoRouter);

  // Notifications
  app.use("/api/notifications", notificationRouter);
};

export default registeredRouters;
