import mongoose from "mongoose";

const TranscriptionSchema = new mongoose.Schema({
  audioUrl: { type: String, required: true },
  transcription: { type: String, required: true },
  summary: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transcription", TranscriptionSchema);
