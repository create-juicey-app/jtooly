import MuiAppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { mainListItems, secondaryListItems } from "./listItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import * as React from "react";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import DynamicBreadcrumbs from "../../components/FrontModules/dynamicbread.js";
import {
  Backdrop,
  Menu,
  MenuList,
  ListItemIcon,
  MenuItem,
  ListItemText,
  Avatar,
  Button,
  useTheme,
  Stack,
  Tooltip,
  darken,
  lighten,
} from "@mui/material";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
export default function MainBar() {
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      boxSizing: "border-box",
      transform: open ? "translateX(0)" : `translateX(-${drawerWidth}px)`,
      animation: `${open ? "slideIn" : "slideOut"} ${
        theme.transitions.duration.standard
      }ms ${theme.transitions.easing.easeInOut}`,
    },
    [`@keyframes slideIn`]: {
      from: { transform: `translateX(-${drawerWidth}px)` },
      to: { transform: "translateX(0)" },
    },
    [`@keyframes slideOut`]: {
      from: { transform: "translateX(0)" },
      to: { transform: `translateX(-${drawerWidth}px)` },
    },
    ...(!open && {
      "& .MuiDrawer-paper:not(.MuiDrawer-paperAnchorDockedLeft)": {
        animation: `$slideOut ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      },
    }),
  }));

  function LoginButton() {
    const { data: session } = useSession();
    const [opened, setOpened] = React.useState(false);

    const handleMenu = (event) => {
      setOpened(true);
    };

    const handleClose = () => {
      setOpened(false);
    };

    if (session) {
      return (
        <>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="h6">Welcome, {session.user.name}</Typography>

            <IconButton size="medium" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon fontSize="24" />
              </Badge>
            </IconButton>
            <Drawer>
              <Menu
                id="menu-appbar"
                open={opened}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuList sx={{ width: 220, maxWidth: "100%" }}>
                  <Link href={"/settings"}>
                    <MenuItem>
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                  </Link>
                  <Divider />
                  <MenuItem onClick={() => signOut()}>
                    <ListItemIcon>
                      <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Drawer>
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
            <Link href={"/settings"}>
              <MenuItem>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Settings</ListItemText>
              </MenuItem>
            </Link>
            <Divider />

            <IconButton size="medium" color="inherit" onClick={handleMenu}>
              <Avatar size="large" src={session.user.image}></Avatar>
            </IconButton>
          </Stack>
        </>
      );
    }
    return (
      <>
        <Button
          sx={{ borderRadius: "18px" }}
          variant="contained"
          size="medium"
          onClick={() => signIn()}
        >
          Sign in
        </Button>
      </>
    );
  }
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const TempAppbar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "closed",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      boxSizing: "border-box",
      transform: open ? "translateX(0)" : `translateX(-${drawerWidth}px)`,
      animation: `${open ? "slideIn" : "slideOut"} ${
        theme.transitions.duration.standard
      }ms ${theme.transitions.easing.easeInOut}`,
    },
    [`@keyframes slideIn`]: {
      from: { transform: `translateX(-${drawerWidth}px)` },
      to: { transform: "translateX(0)" },
    },
    [`@keyframes slideOut`]: {
      from: { transform: "translateX(0)" },
      to: { transform: `translateX(-${drawerWidth}px)` },
    },
    ...(!open && {
      "& .MuiDrawer-paper:not(.MuiDrawer-paperAnchorDockedLeft)": {
        animation: `$slideOut ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      },
    }),
  }));
  const theme = useTheme();
  const paperBackgroundColor =
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.8)
      : darken(theme.palette.primary.dark, 0.9);

  const isDev = process.env.NODE_ENV === "development";
  return (
    <>
      <TempAppbar
        sx={{
          backgroundColor: paperBackgroundColor,
          width: "98%",
          left: "1%",
          borderBottomLeftRadius: "18px",
          borderBottomRightRadius: "18px",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              zIndex: "10",
              marginRight: "36px",
            }}
          >
            {open ? (
              <MenuOpenRoundedIcon
                sx={{
                  transition: "transform 0.2s ease-out",
                  transform: "rotate(0deg)",
                }}
              />
            ) : (
              <MenuRoundedIcon
                sx={{
                  transition: "transform 0.2s ease-out",
                  transform: "rotate(0deg)",
                }}
              />
            )}
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <Link href="/">Jtooly </Link>
            {isDev && (
              <Tooltip
                placement="left-end"
                title="Devloppement mode, expect errors, lag, slow loading, or glitches"
              >
                <LogoDevIcon color="primary"></LogoDevIcon>
              </Tooltip>
            )}
            <DynamicBreadcrumbs />
          </Typography>

          <LoginButton />
        </Toolbar>
      </TempAppbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={toggleDrawer}
      >
        <Drawer
          sx={{
            borderTopRightRadius: "18px",
            borderBottomRightRadius: "18px",
            position: "absolute",
            left: 0,
          }}
          className="fixed"
          variant="permanent"
          open={open}
        >
          <Toolbar
            sx={{
              borderTopRightRadius: "18px",
              borderBottomRightRadius: "18px",
              display: "flex",

              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton
              sx={{ position: "absolute", marginLeft: "10px", left: 0 }}
              onClick={toggleDrawer}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />

          <List position="fixed" component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
      </Backdrop>
    </>
  );
}
