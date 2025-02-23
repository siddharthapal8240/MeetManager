import express from "express";
import { processTranscription } from "../controllers/transcriptionController.js";


const router = express.Router();

router.get("/transcription/:id", async (req, res) => {
  const transcription = await processTranscription(req.params.id);
  if (!transcription) return res.status(500).json({ error: "Failed to fetch transcription." });

  res.json({ transcription });
});

export default router;
