import * as React from "react";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import BarChartIcon from "@mui/icons-material/BarChart";
import DeviceUnknownRoundedIcon from "@mui/icons-material/DeviceUnknownRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import GamepadRoundedIcon from "@mui/icons-material/GamepadRounded";
import { Badge, Button, Chip, Divider } from "@mui/material";
import CircleNotificationsRoundedIcon from "@mui/icons-material/CircleNotificationsRounded";
import BentoIcon from "@mui/icons-material/Bento";
import KeyboardDoubleArrowUpRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowUpRounded";
import { Google } from "@mui/icons-material";
export const mainListItems = (
  <React.Fragment>
    <Link href="/">
      <ListItemButton>
        <ListItemIcon>
          <HomeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Main Menu" />
      </ListItemButton>
    </Link>
    <Link href="/users">
      <ListItemButton>
        <ListItemIcon>
          <PeopleAltRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Link>
    <br />
    <Divider>
      <Link href="/projects">
        <Button>
          <Chip
            sx={{
              cursor: "pointer",
            }}
            label="Projects"
          />
        </Button>
      </Link>
    </Divider>

    <Link href="/projects/YoutubeDownloader">
      <ListItemButton>
        <ListItemIcon>
          <FileDownloadRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Youtube Downloader" />
      </ListItemButton>
    </Link>

    <Link href="/projects/JRN">
      <ListItemButton>
        <ListItemIcon>
          <EmojiEmotionsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="About Me" />
      </ListItemButton>
    </Link>
    <Link href="/projects/dialogM3">
      <ListItemButton>
        <ListItemIcon>
          <BentoIcon />
        </ListItemIcon>
        <ListItemText primary="M3 Dialog" />
      </ListItemButton>
    </Link>
    <Link href="/projects/gsearch">
      <ListItemButton>
        <ListItemIcon>
          <Badge
            color="secondary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={"WIP"}
          >
            <Google />
          </Badge>
        </ListItemIcon>

        <ListItemText primary="Search Generator" />
      </ListItemButton>
    </Link>
    <br />

    <Divider>
      <Link href="/experiments">
        <Button>
          <Chip
            sx={{
              cursor: "pointer",
            }}
            label="Experiments"
          />
        </Button>
      </Link>
    </Divider>

    <Link href="/experiments/donut">
      <ListItemButton>
        <ListItemIcon>
          <DeviceUnknownRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="C Doughnut" />
      </ListItemButton>
    </Link>
    <Link href="/experiments/kby">
      <ListItemButton>
        <ListItemIcon>
          <GamepadRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Samurai Kirby" />
      </ListItemButton>
    </Link>
    <Link href="/experiments/notification">
      <ListItemButton>
        <ListItemIcon>
          <CircleNotificationsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Beta Notifications" />
      </ListItemButton>
    </Link>
    <Link href="/experiments/gotest">
      <ListItemButton>
        <ListItemIcon>
          <KeyboardDoubleArrowUpRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Scroll Testing" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = <React.Fragment></React.Fragment>;
