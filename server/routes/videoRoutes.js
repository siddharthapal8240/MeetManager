import express from "express";
import { processVideoFile } from "../controllers/videoController.js";

const router = express.Router();

router.post("/process-video", async (req, res) => {
  const { filePath } = req.body;

  if (!filePath) return res.status(400).json({ error: "File path is required." });

  const transcriptionId = await processVideoFile(filePath);
  if (!transcriptionId) return res.status(500).json({ error: "Failed to process video." });

  res.json({ message: "Processing started.", transcriptionId });
});

export default router;
