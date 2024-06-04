import React,{useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { settings } from '../constant/sidebarLinks';
import './style.css'

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';

import { useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../constant/sidebarLinks';
import SiderbarItems from './sidebarItems';
import {useSelector,useDispatch} from 'react-redux'
import Confirmation from '../components/confirmationModal';
import {logOut} from '../operations/authAPi/index';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBar() {
  const {profile} = useSelector((store) => store.profile)
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isOpen,setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (path) => {
    if(path === ''){
      setIsOpen(true)
    }
    navigate(`${path}`)
    setAnchorElUser(null);
  };

  const handleClick = () => {
    const token = localStorage.getItem('token');
    dispatch(logOut(JSON.parse(token)),navigate);
    setIsOpen(false);
    navigate('/login')
  }

  return (
    <React.Fragment>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:'white'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              fontWeight:'bold',
              color:'#4a4c4e',
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{color:'#4a4c4e',fontWeight:'bold'}} variant="h5" noWrap component="div">
           Foodo App
          </Typography>
          <Box sx={{ flexGrowashboard: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt={`${profile?.firstName} ${profile?.lastName}`}
                src={ profile?.profile}
              />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={() => { handleCloseUserMenu(setting.path)}}>
                  <Typography textAlign="center">{setting.tittle}</Typography>
                </MenuItem>
              ))}
            </Menu>
        </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG1UEQPNKrTtW7hzlzc2HblkrWVpvVxHR5qg&usqp=CAU' style={{width:'160px'}}/>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box className='sidebar-links'>
          <List>
              {
                sidebarLinks.map((link) => (
                  <SiderbarItems key={link.id} link={link} navigate={navigate} open={open}/>
                ))
              }
          </List>
        </Box>
    
      </Drawer>
    </Box>
    <Confirmation handleClick={handleClick} open={isOpen} setOpen={setIsOpen} title={'Are you Sure to Logout?'} description={''}/>
    </React.Fragment>
  );
}
