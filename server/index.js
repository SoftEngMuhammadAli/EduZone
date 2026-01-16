import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./src/shared/config/server.js";
import registeredRouters from "./src/modules/index.js";
import path from "path";
import { fileURLToPath } from "url";
import { getHostsList } from "./src/shared/utils/constants.js";
import { globalErrorHandler } from "./src/shared/middlewares/global_error_handler.js";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = getHostsList();
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "7d",
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "public, max-age=604800");
    },
  }),
);

app.set("json spaces", 2);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template", "custom"));

app.get("/", (req, res) => {
  res.render("documentation", {
    data: {
      greeting: "Hello World!",
      environment: process.env.NODE_ENV || "development",
      serverTime: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
    },
    documentation: "https://documenter.getpostman.com/view/32471550/2sB34kEzEc",
    uptime: process.uptime(),
  });
});

registeredRouters(app);

app.use(globalErrorHandler);

connectToDatabase(process.env.DB_CONFIGURATION);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
