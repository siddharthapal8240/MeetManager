import cloudinary from "../config/cloudinaryConfig.js";
import extractAudioFromVideo from "../utils/extractAudio.js";
import { processTranscription } from "./transcriptionController.js"; 

export const processVideoFile = async (videoFilePath) => {
  console.log(`📂 Processing video file: ${videoFilePath}`);

  try {
    const videoUrl = await uploadToCloudinary(videoFilePath, "video");
    if (!videoUrl) return;

    const audioFilePath = await extractAudioFromVideo(videoFilePath);
    if (!audioFilePath) return;

    const audioUrl = await uploadToCloudinary(audioFilePath, "audio");
    if (!audioUrl) return;

    const transcriptionResult = await processTranscription(audioUrl); 
    if (transcriptionResult) return videoUrl;;
  } catch (error) {
    console.error("Error processing video file:", error);
  }
};

const uploadToCloudinary = async (filePath, fileType) => {
  try {
    console.log(`📤 Uploading ${fileType} to Cloudinary...`);
    const result = await cloudinary.v2.uploader.upload(filePath, {
      resource_type: fileType === "video" ? "video" : "auto",
      folder: "meeting_recordings",
    });
    console.log(`✅ Upload Successful! File URL: ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error("❌ Upload Failed:", error);
    return null;
  }
};
