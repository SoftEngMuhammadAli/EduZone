import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/server.js";
import registeredRouters from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://edu-zone-kappa.vercel.app",
      "https://eduzone-jscm.onrender.com",
    ],

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
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
  })
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

connectToDatabase(process.env.DB_CONFIGURATION);

app.listen(PORT, () => {
  console.log(`Server running on port: http://localhost:${PORT}`);
});
