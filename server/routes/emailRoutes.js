import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadAndSendEmails } from "../controllers/emailController.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadAndSendEmails);

export default router;
