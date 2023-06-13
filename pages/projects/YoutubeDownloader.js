import { useState, useEffect } from "react";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const DownloadPage = () => {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("highest");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSize, setCurrentSize] = useState(0);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleQualityChange = (event) => {
    setQuality(event.target.value);
  };

  const handleDownload = async () => {
    try {
      setLoading(true);
      setProgress(0);

      const response = await fetch("/api/other/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, quality }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "video.mp4";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error("Download failed:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    let totalSize = 0;

    const fetchVideoInfo = async () => {
      try {
        const response = await fetch("/api/other/video-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        });

        if (response.ok) {
          const data = await response.json();
          totalSize = data.size;
          console.log("size", totalSize); // Log the updated size here
          startLoading(totalSize);
        } else {
          console.error("Video info fetch failed:", response.statusText);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching video info:",
          error.message
        );
      }
    };

    const startLoading = (totalSize) => {
      const increment = totalSize / 35;
      let currentProgress = 0;

      const progressInterval = setInterval(() => {
        currentProgress += increment;
        setProgress((prevProgress) => {
          const newProgress = Math.min(prevProgress + increment, 100);
          return newProgress;
        });
      }, 200);
    };

    if (loading) {
      fetchVideoInfo();
    }
  }, [loading, url]);
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography variant="h4">YouTube Video Downloader Rewritten</Typography>
      </Grid>
      <Grid item>
        <FormControl>
          <Typography variant="body1">Video URL:</Typography>
          <TextField type="text" value={url} onChange={handleUrlChange} />
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <Typography variant="body1">Quality:</Typography>
          <Select value={quality} onChange={handleQualityChange}>
            <MenuItem value="highest">Normal</MenuItem>
            <MenuItem value="audio_only">Audio Only</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleDownload} disabled={loading}>
          Download
        </Button>
      </Grid>

      {loading && (
        <Grid item xs={12}>
          <CircularProgress variant="determinate" value={progress} />
        </Grid>
      )}
    </Grid>
  );
};

export default DownloadPage;
