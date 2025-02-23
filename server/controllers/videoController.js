import cloudinary from "../config/cloudinaryConfig.js";
import extractAudioFromVideo from "../utils/extractAudio.js";
import { processTranscription } from "./transcriptionController.js"; 

export const processVideoFile = async (videoFilePath) => {
  console.log(`📂 Processing video file: ${videoFilePath}`);

  try {
    console.log('Uploading video to Cloudinary');
    const videoUrl = await uploadToCloudinary(videoFilePath, "video");
    if (!videoUrl) {
      console.log('Video upload failed');
      return null;
    }
    console.log('Video uploaded:', videoUrl);

    console.log('Extracting audio');
    const audioFilePath = await extractAudioFromVideo(videoFilePath);
    if (!audioFilePath) {
      console.log('Audio extraction failed');
      return null;
    }
    console.log('Audio extracted:', audioFilePath);

    console.log('Uploading audio to Cloudinary');
    const audioUrl = await uploadToCloudinary(audioFilePath, "audio");
    if (!audioUrl) {
      console.log('Audio upload failed');
      return null;
    }
    console.log('Audio uploaded:', audioUrl);

    console.log('Processing transcription');
    const transcriptionResult = await processTranscription(audioUrl); 
    if (!transcriptionResult) {
      console.log('Transcription failed');
      return null;
    }
    console.log('Transcription completed:', transcriptionResult);

    return { videoUrl, transcription: transcriptionResult };
  } catch (error) {
    console.error("Error processing video file:", error.message, error.stack);
    throw error;
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
    console.error("❌ Upload Failed:", error.message, error.stack);
    return null;
  }
};