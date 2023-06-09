import {
  Slider,
  Switch,
  useTheme,
  Stack,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { darken } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";

const Doughnut = () => {
  const [speed, setSpeed] = React.useState(35);
  const [paused, setPaused] = React.useState(false);
  const [blur, setBlur] = React.useState(false);
  const canvasRef = useRef();
  const theme = useTheme();

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handlePauseChange = (event) => {
    setPaused(event.target.checked);
  };
  const handleBlurChange = (event) => {
    setBlur(event.target.checked);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const colors = [
      darken(theme.palette.primary.main, 0),
      darken(theme.palette.primary.main, 0.2),
      darken(theme.palette.primary.main, 0.4),
      darken(theme.palette.primary.main, 0.6),
    ];

    let A = 1,
      B = 1;
    let asciiframe = () => {
      if (paused) return;

      let b = [];
      let z = [];
      A += 0.07;
      B += 0.03;
      let cA = Math.cos(A),
        sA = Math.sin(A),
        cB = Math.cos(B),
        sB = Math.sin(B);
      for (let k = 0; k < 1760; k++) {
        b[k] = " ";
        z[k] = 0;
      }
      for (let j = 0; j < 6.28; j += 0.07) {
        let ct = Math.cos(j),
          st = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
          let sp = Math.sin(i),
            cp = Math.cos(i),
            h = ct + 2,
            D = 1 / (sp * h * sA + st * cA + 5),
            t = sp * h * cA - st * sA;

          let x = 0 | (40 + 30 * D * (cp * h * cB - t * sB)),
            y = 0 | (12 + 15 * D * (cp * h * sB + t * cB)),
            o = x + 80 * y,
            N =
              0 |
              (10 *
                ((st * sA - sp * ct * cA) * cB -
                  sp * ct * sA -
                  st * cA -
                  cp * ct * sB));

          if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
            z[o] = D;
            b[o] = ".,-~:;=!*#$@%&&()_+`".charAt(N > 0 ? N : 0);
          }
        }
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (blur) {
        // Apply blur effect
        ctx.filter = "blur(2px)";
      } else {
        ctx.filter = "none";
      }
      ctx.font = "16px monospace";
      for (let i = 0; i < b.length; i++) {
        if (b[i] !== " ") {
          let x = i % 80,
            y = Math.floor(i / 80);
          let shade = Math.floor(z[i] * 4);
          ctx.fillStyle = colors[shade];
          ctx.fillText(b[i], x * 10, y * 20);
        }
      }
    };
    let interval = setInterval(asciiframe, speed);
    return () => clearInterval(interval);
  }, [speed, paused]);

  return (
    <Stack>
      <Paper sx={{ height: 600, width: 800, padding: 2, marginBottom: 4 }}>
        <div className={blur ? "canvas-container blur" : "canvas"}>
          <canvas ref={canvasRef} width={800} height={600} />
        </div>
      </Paper>
      <Typography variant="caption">Speed: {100 - speed}</Typography>
      <Slider value={speed} onChange={handleSpeedChange}></Slider>
      <Grid>
        <Typography variant="body1">Pause:</Typography>
        <Switch checked={paused} onChange={handlePauseChange}></Switch>
      </Grid>
      <Grid>
        <Typography variant="body1">Blur :</Typography>
        <Switch checked={blur} onChange={handleBlurChange}></Switch>
      </Grid>
    </Stack>
  );
};

export default Doughnut;
