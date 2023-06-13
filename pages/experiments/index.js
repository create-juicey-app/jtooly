import React from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Icon,
} from "@mui/material";

import { ScienceRounded, DeviceUnknownRounded } from "@mui/icons-material";
const HomePage = () => {
  const router = useRouter();

  const handleCardClick = (path) => {
    router.push(path);
  };

  const cards = [
    {
      title: "'C' Doughnut in React!",
      description: "An 'C' Doughnut in React!",
      icon: <DeviceUnknownRounded />,
      image: "/previews/Placeholder.png",
      path: "/projects/donut",
    },
    {
      title: "'C' Doughnut in React!",
      description: "An 'C' Doughnut in React!",
      icon: <DeviceUnknownRounded />,
      image: "/previews/Placeholder.png",
      path: "/projects/donut",
    },
    {
      title: "'C' Doughnut in React!",
      description: "An 'C' Doughnut in React!",
      icon: <DeviceUnknownRounded />,
      image: "/previews/Placeholder.png",
      path: "/projects/donut",
    },
  ];

  return (
    <>
      <Typography variant="h3" gutterBottom>
        <Icon fontSize="large">
          <ScienceRounded fontSize="large"></ScienceRounded>
        </Icon>{" "}
        Experiments
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
