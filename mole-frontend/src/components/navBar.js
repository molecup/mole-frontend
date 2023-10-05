/*
  source code: https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu
*/

'use client'

import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NextLinkComposed } from '@/components/Link';
import Link from "next/link";
import MoleIcon from '@/components/moleIcon';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

const pages=[
  { name: 'Molecup', url: '/' },
  { name:'News', url: '/news' },
  { name:'Ripetizioni', url: '/ripetizioni'}
];
const settings = [
  { name:'Profile', url:"/" },
  { name:'Account', url:"/" },
  { name:'Logout', url:"/" },
];

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function NavBar(props) {
  const { children } = props;
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setShowMobileNav(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setShowMobileNav(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <HideOnScroll >
      <AppBar  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/*mobile menu*/}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/*mobile sidebar*/}
            <SwipeableDrawer
              disableBackdropTransition={!iOS} disableDiscovery={iOS}
              anchor='left'
              open={showMobileNav}
              onClose={handleCloseNavMenu}
              onOpen={handleOpenNavMenu}
            > 
              <Toolbar/>
              <Box
                sx={{ width: 200}}
                role="presentation"
                onClick={handleCloseNavMenu}
              >
                <List>
                  {pages.map((page) => (
                    <ListItem key={page.name} disablePadding>
                    <ListItemButton component={Link} href={page.url}>
                      <ListItemText primary={page.name} />
                    </ListItemButton>
                  </ListItem>
                  ))}
                </List>
              </Box>
            </SwipeableDrawer>

            {/*mobile title*/}
            <MoleIcon fontSize='large'  sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                fontFamily: 'monospace',
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MOLE
            </Typography>

            {/*desktop title*/}
            <MoleIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              MOLE
            </Typography>

            {/*desktop menu*/}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                  <Button
                    key={page.name}
                    component={Link}
                    href={page.url}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                      {page.name}
                  </Button>
              ))}
            </Box>
            
            {/*profile settings*/}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp">
                  <PersonIcon/>
                  </Avatar>
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
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu} component={NextLinkComposed} to={setting.url}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      </HideOnScroll>
      
    </Box>
    <Toolbar/>
    {children}
    </>
  );
}
export default NavBar;

/*
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={NextLinkComposed} to={page.url}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            */
