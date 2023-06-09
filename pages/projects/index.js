import React from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Icon,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import { Home, Explore, Search, DownloadRounded } from "@mui/icons-material";
import BentoIcon from "@mui/icons-material/Bento";
const HomePage = () => {
  const router = useRouter();

  const handleCardClick = (path) => {
    router.push(path);
  };

  const cards = [
    {
      title: "M3 Dialog",
      description: "An Material Design 3 dialog box in pure MUI.",
      icon: <BentoIcon />,
      image: "/previews/PreviewDialog.png",
      path: "/projects/dialogM3",
    },
    {
      title: "About Me",
      description: "Info about myself.",
      icon: <Explore />,
      image: "/previews/PLACEHOLDER.png",
      path: "/projects/JRN",
    },
    {
      title: "Youtube Downloader",
      description: "Download videos from YouTube + without intrusive bad ads",
      icon: <DownloadRounded />,
      image: "/previews/PreviewYoutube.png",
      path: "/projects/YoutubeDownloader",
    },
  ];

  return (
    <>
      <Typography variant="h3" gutterBottom>
        <Icon fontSize="large">
          <TaskIcon fontSize="large"></TaskIcon>
        </Icon>{" "}
        Projects
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: "flex" }}>
              <CardActionArea onClick={() => handleCardClick(card.path)}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ marginRight: "8px" }}>{card.icon}</div>
                    <Typography variant="h5" component="h2" gutterBottom>
                      {card.title}
                    </Typography>
                  </div>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="250"
                  image={card.image}
                  alt={card.title}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HomePage;
