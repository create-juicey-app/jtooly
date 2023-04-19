
import { useState } from 'react';
import { axios} from 'axios';
import { 
  Box, 
  Checkbox, 
  Skeleton, 
  Divider, 
  IconButton, 
  LinearProgress, 
  Paper, 
  Rating, 
  Snackbar, 
  TextField, 
  Tooltip, 
  Typography 
} from '@mui/material';
import { Alert, CloudDownloadRounded as CloudDownloadRoundedIcon, FileDownloadRounded as FileDownloadRoundedIcon, VolumeOffRounded as VolumeOffRoundedIcon, VolumeUpRounded as VolumeUpRoundedIcon } from '@mui/icons-material';
import FeedbackRoundedIcon from '@mui/icons-material/FeedbackRounded';
export default  function App() {
  const [url, setUrl] = useState('');
  const [quality, setQuality] = useState(1.5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoInfo, setVideoInfo] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const getLabelText = (value) => {
    return `${value} Stars`;
  };

  const labels = {
    0.5: '360p',
    1: '480p',
    1.5: '720p',
    2: '1080p',
    2.5: '1440p',
    3: '2160p'
  };

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    setDownloadLink(null);
    console.log("")
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url, quality: quality })
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
        console.log("not sucess")
      }
      const data = await response;
      if (data.success) {
        console.log("sucess")
        console.log(data.link)
        setDownloadLink(data.link);
        setVideoInfo(data.videoInfo);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Typography variant='h2'>THIS IS BROKEN, AND STILL WILL BE BROKEN</Typography>
<Typography variant='h5'>DUE TO RECENT UPDATES TO HOW YOUTUBE IS LOADING THEIR VIDEOS, MY OWN API IS NOT WORKING ANYMORE, THIS WILL BE FIXED WHEN THE REST OF THE WEBSITE IS MADE</Typography>
<br></br><br></br>
      <Typography variant="h4" align="center" gutterBottom>
        Download YouTube Videos
      </Typography>
      <TextField
      
        placeholder="Enter the youtube video URL here !"
        label="YouTube URL"
        value={url}
        onChange={handleUrlChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Divider />

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Paper sx={{ p: 2, mr: 1 }} elevation={3}>
            <Box  sx={{ alignSelf: 'flex-end', justifyContent: 'flex-end', flexDirection: 'row-reverse' }} >

            </Box>
            <Typography  component="legend" sx={{ mr: 1 }}>Quality</Typography>

            
            <Rating
            disabled
            max={3}
               precision={0.5}
              size="large"
              getLabelText={getLabelText}
              name="simple-controlled"
              value={quality}
              onChange={(event, newValue) => {
                setQuality(newValue);
              }}
            />
                      {quality !== null && (
            <Typography>
              
              {labels[quality]}
            </Typography>
          )}
          </Paper>

        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Paper sx={{ p: 2, mr: 1 }} elevation={3}>
            <div disabled>
            <Tooltip title="Mute Audio">
              <Checkbox icon={<VolumeUpRoundedIcon />} checkedIcon={<VolumeOffRoundedIcon />} />
            </Tooltip>
            </div>
          </Paper>
          <Box sx={{ display:'flex', flexDirection: 'column', alignItems: 'center' }}>

      <Paper sx={{ padding: 2 }} elevation={3}>
      {downloadLink ? (
        <Tooltip title="Download">
          <div disabled>
          <IconButton href={downloadLink} download>
            <FileDownloadRoundedIcon />
          </IconButton>
          </div>
        </Tooltip>
      ) : (
        <div disabled>
        <Tooltip title="Nothing to download">
          <span>
            
            <IconButton>
              <FileDownloadRoundedIcon />
            </IconButton>
          </span>
          
        </Tooltip>
        </div>
      )}<div disabled>
        <Tooltip title="Get Video from Youtube Url">
          <IconButton size="large" disabled onClick={handleDownload}>
            <CloudDownloadRoundedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
        </div>
      </Paper>
    </Box>
  </Box>
</Box>

{loading ? (
  <Skeleton variant="rectangular" width={210} height={118} />
) : (
  <>
    {error && (
      <Typography className="bottom" variant="h6" align="center" color="error" gutterBottom>
        ❗{error}❗
      </Typography>
    )}

    {loading && (
      <Box className="loading-bar">
        <LinearProgress />
      </Box>
    )}
    
    {videoInfo && (
      <Box className="video-container" display="flex" flexDirection="column" alignItems="center" marginTop={2}>
        <div>ROLOBX</div>
        <video src={downloadLink} width="100%" controls />
      </Box>
    )}
  </>
)}

</div>)};
