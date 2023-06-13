import ytdl from "ytdl-core";

export default async function handler(req, res) {
  try {
    const { url } = req.body;
    const videoInfo = await ytdl.getInfo(url);
    const videoDetails = videoInfo.videoDetails;
    const videoSize = videoDetails.lengthSeconds; // Assuming you want to get the video length in seconds

    res.status(200).json({ size: videoSize });
  } catch (error) {
    console.error("An error occurred:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
