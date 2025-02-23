import ffmpeg from "fluent-ffmpeg";

const extractAudioFromVideo = (videoPath) => {
  return new Promise((resolve, reject) => {
    const audioPath = videoPath.replace(/\.[^.]+$/, ".mp3");

    ffmpeg(videoPath)
      .output(audioPath)
      .noVideo()
      .audioCodec("libmp3lame")
      .on("end", () => {
        console.log(`✅ Audio Extraction Successful: ${audioPath}`);
        resolve(audioPath);
      })
      .on("error", (err) => {
        console.error("❌ Audio Extraction Failed:", err);
        reject(err);
      })
      .run();
  });
};

export default extractAudioFromVideo;
