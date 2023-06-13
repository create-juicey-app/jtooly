import React from "react";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useTheme } from "@mui/material/styles";
import { darken } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";
const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
  },
  icons: {
    marginTop: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function MainPage() {
  console.log(useTheme);
  const classes = useStyles();
  const theme = useTheme();
  const paperBackgroundColor =
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.8)
      : darken(theme.palette.primary.dark, 0.9);
  return (
    <>
      <div className={classes.root}>
        <Typography variant="h2">Welcome to Jtooly!</Typography>
        <Typography variant="h1" gutterBottom>
          Version 1.0 (CAN YOU BELIEVE IT GUYS!)
        </Typography>
        <Divider variant="middle"></Divider>
        <Typography variant="subtitle1" gutterBottom>
          This is a test website with no real purpose. Feel free to explore and
          experiment with the features.
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          Today's tip : Im trying my best to make this website the most secure
          possible - Juicey
        </Typography>
      </div>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          backgroundColor: paperBackgroundColor,
          position: "fixed",
          left: "0%",
          width: "98%",
          margin: "auto",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          top: "auto",
          bottom: 0,
        }}
      >
        <Toolbar>
          <div className={classes.icons}>
            <Tooltip arrow describeChild title="Primary Youtube Channel">
              <IconButton
                size="small"
                color="primary"
                href="https://www.youtube.com/channel/UCjfsoMEScp4Mw5zLepNxuQw"
              >
                <YouTubeIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip arrow describeChild title="Secondary Youtube Channel">
              <IconButton
                size="small"
                color="secondary"
                href="https://www.youtube.com/channel/UClUzSxoR2OrisM5y5UVNeHA"
              >
                <YouTubeIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            <Tooltip arrow describeChild title="Chat with me on Discord">
              <IconButton
                color="secondary"
                href="https://discord.com/channels/@me/629932907657691147"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="bi bi-discord"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                </svg>
              </IconButton>
            </Tooltip>
            <Tooltip arrow describeChild title="Steam Account">
              <IconButton
                color="secondary"
                href="https://steamcommunity.com/id/Juiceyisgay/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-steam"
                  viewBox="0 0 16 16"
                >
                  <path d="M.329 10.333A8.01 8.01 0 0 0 7.99 16C12.414 16 16 12.418 16 8s-3.586-8-8.009-8A8.006 8.006 0 0 0 0 7.468l.003.006 4.304 1.769A2.198 2.198 0 0 1 5.62 8.88l1.96-2.844-.001-.04a3.046 3.046 0 0 1 3.042-3.043 3.046 3.046 0 0 1 3.042 3.043 3.047 3.047 0 0 1-3.111 3.044l-2.804 2a2.223 2.223 0 0 1-3.075 2.11 2.217 2.217 0 0 1-1.312-1.568L.33 10.333Z" />
                  <path d="M4.868 12.683a1.715 1.715 0 0 0 1.318-3.165 1.705 1.705 0 0 0-1.263-.02l1.023.424a1.261 1.261 0 1 1-.97 2.33l-.99-.41a1.7 1.7 0 0 0 .882.84Zm3.726-6.687a2.03 2.03 0 0 0 2.027 2.029 2.03 2.03 0 0 0 2.027-2.029 2.03 2.03 0 0 0-2.027-2.027 2.03 2.03 0 0 0-2.027 2.027Zm2.03-1.527a1.524 1.524 0 1 1-.002 3.048 1.524 1.524 0 0 1 .002-3.048Z" />
                </svg>
              </IconButton>
            </Tooltip>
            <Tooltip arrow describeChild title="GitHub Account">
              <IconButton
                color="secondary"
                href="https://github.com/create-juicey-app"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </>
  );
}
