import { GoogleGenerativeAI } from "@google/generative-ai";

const summarizeText = async (text) => {
  try {
    console.log("🔄 Summarizing transcript...");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Summarize this meeting transcript in short and point-wise:
      - **Main Topics Discussed**
      - **Key Decisions**
      - **Future Work and Action Items**
      \n      Transcript: \n      """ \n      ${text} \n      """
    `;

    const result = await model.generateContent(prompt);
    return result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary available.";
  } catch (error) {
    console.error("❌ Error in summarization:", error);
    return null;
  }
};

export default summarizeText;
