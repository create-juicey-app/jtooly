import { useTheme } from "@mui/material";
import { darken, lighten } from "@mui/material/styles";
import React, { useEffect, useRef } from "react";

const Doughnut = () => {
  const canvasRef = useRef();
  const theme = useTheme();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const colors = [
      darken(theme.palette.primary.main, 0), // light shade of orange
      darken(theme.palette.primary.main, 0.2),
      darken(theme.palette.primary.main, 0.4),
      darken(theme.palette.primary.main, 0.6),
      darken(theme.palette.primary.main, 0.8), // dark shade of orange
    ];

    let A = 1,
      B = 1;
    let asciiframe = () => {
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
        // j <=> theta
        let ct = Math.cos(j),
          st = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
          // i <=> phi
          let sp = Math.sin(i),
            cp = Math.cos(i),
            h = ct + 2, // R1 + R2*cos(theta)
            D = 1 / (sp * h * sA + st * cA + 5), // this is 1/z
            t = sp * h * cA - st * sA; // this is a clever factoring of some of the terms in x' and y'

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
            b[o] = "=,:;i1tfLCG08#@".charAt(N > 0 ? N : 0);
          }
        }
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    let interval = setInterval(asciiframe, 5);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Doughnut;
