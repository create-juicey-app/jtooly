import * as React from "react";
import { Typography, Stack } from "@mui/material";
function DashboardContent() {
  return (
    <>
      <video className="background-video" autoPlay loop>
        <source src="/whopper.mp4" type="video/mp4" />
      </video>
      <Stack>
        <Typography variant="h1" className="overback">
          THE KONAMI CODE HAS BEEN ENTERED
        </Typography>
        <Typography variant="h3" className="overback">
          Enjoy this whopper moment
        </Typography>
        <Typography variant="h4" className="overback">
          Whopper, Whopper, Whopper, Whopper
        </Typography>
        <Typography variant="h4" className="overback">
          Junior, Double, Triple Whopper
        </Typography>
        <Typography variant="h4" className="overback">
          Flame grilled taste with perfect toppers
        </Typography>
        <Typography variant="h4" className="overback">
          I rule this day
        </Typography>
        <Typography variant="h4" className="overback">
          Lettuce, mayo, pickle, ketchup
        </Typography>
        <Typography variant="h4" className="overback">
          It's okay if I don't want that
        </Typography>
        <Typography variant="h4" className="overback">
          Impossible or Bacon Whopper
        </Typography>
        <Typography variant="h4" className="overback">
          Any Whopper my way
        </Typography>
        <Typography variant="caption" className="overback">
          i aint writting the rest so just sing it yourself
        </Typography>
      </Stack>
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
