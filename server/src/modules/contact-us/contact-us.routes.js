import express from "express";
const router = express.Router();
import { sendContactMessage } from "./contact-us.controller.js";
import { checkAuth } from "../../shared/middlewares/auth_middleware.js";

router.post("/send-message", checkAuth, sendContactMessage);

export default router;
