import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import { promisify } from "util";
import path from "path";
import { createReadStream, createWriteStream } from "fs";
import ffmpegPath from "ffmpeg-static";
const pipeline = promisify(require("stream").pipeline);

export default async (req, res) => {
  try {
    const { url, quality } = req.body;

    // Download video and audio streams separately
    const videoReadableStream = ytdl(url, { quality });
    const audioReadableStream = ytdl(url, { quality: "highestaudio" });

    // Define temporary file paths for video and audio streams
    const videoFilePath = path.resolve("./temp/video.mp4");
    const audioFilePath = path.resolve("./temp/audio.webm");

    // Create writable streams to save video and audio separately
    const videoWritableStream = createWriteStream(videoFilePath);
    const audioWritableStream = createWriteStream(audioFilePath);

    // Use pipeline to save video and audio streams to their respective files
    await pipeline(videoReadableStream, videoWritableStream);
    await pipeline(audioReadableStream, audioWritableStream);

    // Merge video and audio files into an MP4 file
    const mergedFilePath = path.resolve("./temp/merged.mp4");
    await mergeVideoWithAudio(videoFilePath, audioFilePath, mergedFilePath);

    // Set the appropriate headers for the response
    res.setHeader("Content-Disposition", "attachment; filename=merged.mp4");
    res.setHeader("Content-Type", "video/mp4");

    // Send the merged file as the response
    const mergedReadableStream = createReadStream(mergedFilePath);
    await pipeline(mergedReadableStream, res);

    // Cleanup temporary files
    fs.unlinkSync(videoFilePath);
    fs.unlinkSync(audioFilePath);
    fs.unlinkSync(mergedFilePath);
  } catch (error) {
    console.error("An error occurred:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const mergeVideoWithAudio = (videoPath, audioPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegPath);

    if (videoPath === "audio_only") {
      const audioOutputPath = outputPath + ".mp3";

      ffmpeg()
        .input(audioPath)
        .outputOptions("-c:a libmp3lame")
        .outputOptions("-q:a 2")
        .save(audioOutputPath)
        .on("end", () => resolve(audioOutputPath))
        .on("error", (error) => reject(error));
    } else {
      ffmpeg()
        .input(videoPath)
        .input(audioPath)
        .outputOptions("-c:v copy")
        .outputOptions("-c:a aac")
        .outputOptions("-strict experimental")
        .save(outputPath)
        .on("end", () => resolve(outputPath))
        .on("error", (error) => reject(error));
    }
  });
};
