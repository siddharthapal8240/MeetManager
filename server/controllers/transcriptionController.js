import axios from "axios";
import summarizeText from "../utils/summarizeText.js";
import Transcription from "../models/Transcription.js";


export const processTranscription = async (audioUrl) => {
  try {
    console.log("📝 Requesting transcription from AssemblyAI...");

    const response = await axios.post(
      "https://api.assemblyai.com/v2/transcript",
      { audio_url: audioUrl, speaker_labels: true },
      { headers: { authorization: process.env.ASSEMBLYAI_API_KEY } }
    );

    if (!response.data.id) {
      console.error("❌ Failed to request transcription. No ID received.");
      return null;
    }

    const transcriptionId = response.data.id;
    console.log(`✅ Transcription Requested, ID: ${transcriptionId}`);

    // Fetch transcribed text
    const text = await fetchTranscription(transcriptionId);
    if (!text) return null;

    // Generate summary
    const summary = await summarizeText(text);
    if (!summary) {
      console.error("⚠️ Summary generation failed.");
      return null;
    }

    // Store in MongoDB
    const newTranscription = new Transcription({
      audioUrl,
      transcription: text,
      summary,
    });

    await newTranscription.save();
    console.log("✅ Transcription & Summary Stored in Database!");

    return { text, summary };
  } catch (error) {
    console.error("❌ Transcription Process Failed:", error.message);
    return null;
  }
};


const fetchTranscription = async (transcriptionId) => {
  try {
    let attempts = 0;
    const maxAttempts = 12; 
    const delay = 5000; 

    while (attempts < maxAttempts) {
      attempts++;
      console.log(`🕒 Checking transcription status... (Attempt ${attempts}/${maxAttempts})`);

      const response = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptionId}`,
        { headers: { authorization: process.env.ASSEMBLYAI_API_KEY } }
      );

      const { status, text, error } = response.data;

      if (status === "completed") {
        console.log("✅ Transcription Completed!");
        console.log("📝 Transcribed Text:\n", text);
        return text;
      } else if (status === "failed") {
        console.error("❌ Transcription Failed:", error);
        return null;
      }

      if (attempts >= maxAttempts) {
        console.log("⚠️ Transcription taking too long. Exiting polling loop.");
        return null;
      }

      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
    }
  } catch (error) {
    console.error("❌ Error fetching transcription:", error.message);
    return null;
  }
};
