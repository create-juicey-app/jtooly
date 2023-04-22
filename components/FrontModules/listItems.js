import * as React from 'react';
import Link from 'next/link'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
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
  <Link href="/Users">
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
      <ListItemText primary="JRN" />
    </ListItemButton>
    </Link>
  <Link href="/">
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
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
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
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
