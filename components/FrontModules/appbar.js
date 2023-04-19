import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { mainListItems, secondaryListItems } from './listItems';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import * as React from 'react';
import { Backpack, ChevronRightRounded } from '@mui/icons-material';
import {Backdrop} from '@mui/material'
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
export default function MainBar() {
  const drawerWidth = 240;
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({

      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        boxSizing: 'border-box',
        transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
        animation: `${open ? 'slideIn' : 'slideOut'} ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      },
      [`@keyframes slideIn`]: {
        from: { transform: `translateX(-${drawerWidth}px)` },
        to: { transform: 'translateX(0)' },
      },
      [`@keyframes slideOut`]: {
        from: { transform: 'translateX(0)' },
        to: { transform: `translateX(-${drawerWidth}px)` },
      },
      ...(!open && {
        '& .MuiDrawer-paper:not(.MuiDrawer-paperAnchorDockedLeft)': {
          animation: `$slideOut ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
        },
      }),
    })
  );
  

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const TempAppbar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'closed' })(
    ({ theme, open }) => ({
      
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        boxSizing: 'border-box',
        transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
        animation: `${open ? 'slideIn' : 'slideOut'} ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
      },
      [`@keyframes slideIn`]: {
        from: { transform: `translateX(-${drawerWidth}px)` },
        to: { transform: 'translateX(0)' },
      },
      [`@keyframes slideOut`]: {
        from: { transform: 'translateX(0)' },
        to: { transform: `translateX(-${drawerWidth}px)` },
      },
      ...(!open && {
        '& .MuiDrawer-paper:not(.MuiDrawer-paperAnchorDockedLeft)': {
          animation: `$slideOut ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
        },
      }),
    })
  );

return(  <><TempAppbar position="fixed" open={open}>
<Toolbar
  sx={{
    pr: '24px', // keep right padding when drawer closed
  }}
>
<IconButton
  edge="start"
  color="inherit"
  aria-label="open drawer"
  onClick={toggleDrawer}
  sx={{
    zIndex: '10',
    marginRight: '36px',
  }}
>
  {open ? (
    <MenuOpenRoundedIcon
    sx={{
      transition: 'transform 0.2s ease-out',
      transform: 'rotate(0deg)',
    }}
  />
  ) : (
      <MenuRoundedIcon
        sx={{
          transition: 'transform 0.2s ease-out',
          transform: 'rotate(0deg)',
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
    Jtooly
  </Typography>
  <IconButton color="inherit">
    <Badge badgeContent={4} color="secondary">
      <NotificationsIcon />
    </Badge>
  </IconButton>
</Toolbar>

</TempAppbar>
<Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
  onClick={toggleDrawer}
>
<Drawer sx={{ position: 'absolute', left: 0 }} className='fixed' variant="permanent" open={open}>

          <Toolbar 
            sx={{
              
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton sx={{ position: 'absolute', marginLeft:"10px", left: 0 }} onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List position="fixed" component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
          
        </Drawer></Backdrop>


        </>)}