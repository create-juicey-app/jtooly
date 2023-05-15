import * as React from "react";
import Link from "next/link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import EmojiEmotionsRoundedIcon from "@mui/icons-material/EmojiEmotionsRounded";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
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
    <Link href="/YoutubeDownloader">
      <ListItemButton>
        <ListItemIcon>
          <FileDownloadRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Youtube Downloader" />
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
    <Link href="/JRN">
      <ListItemButton>
        <ListItemIcon>
          <EmojiEmotionsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="About Me" />
      </ListItemButton>
    </Link>
    <Link href="/dialogM3">
      <ListItemButton>
        <ListItemIcon>
          <QuizRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="M3 Dialog" />
      </ListItemButton>
    </Link>
    <Link href="/">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
export const adminOnlyListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
