import ytdl from 'ytdl-core';

export default async function handler(req, res) {
  const { url } = req.body;
  const quality = String(req.query.quality || '5'); // Default to highest quality
  
  try {
    console.log(`getting video info for url: ${url}, quality: ${quality}`);
    const videoInfo = await ytdl.getInfo(url);
    const videoFormats = ytdl.filterFormats(videoInfo.formats, 'videoandaudio');

    console.log('available video formats:');
    videoFormats.forEach((format) => {
      console.log(`  ${format.qualityLabel}`);
    });

    let videoFormat;

    switch (quality) {
      case '1':
        videoFormat = ytdl.chooseFormat(videoFormats, { quality: 'lowest' });
        console.log('selected lowest quality');
        break;
      case '2':
        videoFormat = ytdl.chooseFormat(videoFormats, { quality: 'low' });
        console.log('selected low quality');
        break;
      case '3':
        videoFormat = ytdl.chooseFormat(videoFormats, { quality: 'medium' });
        console.log('selected medium quality');
        break;
      case '4':
        videoFormat = ytdl.chooseFormat(videoFormats, { quality: 'high' });
        console.log('selected high quality');
        break;
      case '5':
        videoFormat = ytdl.chooseFormat(videoFormats, { quality: 'highest' });
        console.log('selected highest quality');
        break;
      default:
        videoFormat = ytdl.chooseFormat(videoFormats, { quality: 'highest' });
        console.log('selected default (highest) quality');
        break;
    }

    if (!videoFormat) {
      console.error('No video format found for the selected quality');
      res.status(500).json({ success: false, message: 'Failed to download video' });
      return;
    }

    const stream =    ytdl(url, { format: videoFormat }).pipe(res).on('finish', () => {
      res.end();
    });
    res.setHeader('Content-Disposition', `attachment; filename="DownloadedVideo"`);
    res.setHeader('Content-Type', 'video/mp4');
 
    
    const videoUrl = await new Promise((resolve, reject) => {
      stream.on('info', (info) => {
        resolve(info.videoDetails.video_url);
      });
      stream.on('error', (err) => {
        reject(err);
      });
    });

    res.json({ success: true, link: videoUrl, videoInfo: videoInfo });
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ success: false, message: 'Failed to download video' });
  }
}
