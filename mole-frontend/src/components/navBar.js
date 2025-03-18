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
import { useParams } from 'next/navigation'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
  const { children, tournamentList } = props;
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElT, setAnchorElT] = useState(null);
  const params = useParams()

  const handleOpenNavMenu = (event) => {
    setShowMobileNav(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenTMenu = (event) => {
    setAnchorElT(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setShowMobileNav(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseTMenu = () => {
    setAnchorElT(null);
  };

  const pages=[
    { name: 'Chi siamo', url: '/' },
    { name: 'Tornei', url: '/molecup',
      children: tournamentList.map(t => ({name: t.attributes.name, url: `/${t.attributes.slug}`}))
    },
    { name:'News', url: '/news' },
    //{ name: 'Store', url: 'https://store.molecup.com'},
  ];

  const settings = [
  ];

  const iOS =
  typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  console.log(params.tSlug);
  console.log(tournamentList);

  const currentTournament = tournamentList.find(tournament => tournament.attributes.slug === params.tSlug);

  console.log(currentTournament);

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <HideOnScroll >
      <AppBar  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color="primary">
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
                //onClick={handleCloseNavMenu}
              >
                <List>
                  {pages.map((page) => (
                    page.children ? (
                      <ListItem key={page.name} disablePadding>
                        <Accordion sx={{ width: '100%' }} elevation={0} defaultExpanded>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${page.name}-content`}
                            id={`${page.name}-header`}
                          >
                            <ListItemText primary={page.name} />
                          </AccordionSummary>
                          <AccordionDetails 
                            sx={{ padding: '0 15px' }}
                          >
                            <List disablePadding>
                              {page.children.map((child) => (
                                <ListItem key={child.name} disablePadding onClick={handleCloseNavMenu}>
                                  <ListItemButton component={Link} href={child.url}>
                                    <ListItemText primary={child.name} />
                                  </ListItemButton>
                                </ListItem>
                              ))}
                            </List>
                          </AccordionDetails>
                        </Accordion>
                      </ListItem>
                    ) : (
                      <ListItem key={page.name} disablePadding onClick={handleCloseNavMenu}>
                        <ListItemButton component={Link} href={page.url}>
                          <ListItemText primary={page.name} />
                        </ListItemButton>
                      </ListItem>
                    )
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
              href={`/${currentTournament?.attributes?.slug || ""}`}
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                fontFamily: 'monospace',
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              {currentTournament?.attributes?.name || "LCS"}
            </Typography>

            {/*desktop title*/}
            <MoleIcon fontSize='large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href={`/${currentTournament?.attributes?.slug || ""}`}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                textTransform: 'uppercase',
              }}
            >
              {currentTournament?.attributes?.name || "LCS"}
            </Typography>

            {/*desktop menu*/}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              page.children ? (
                <Box 
                  key={page.name} sx={{ position: 'relative', display: 'block' }}
                  onMouseEnter={(event) => setAnchorElT(event.currentTarget)} // Open dropdown on hover
                  onMouseLeave={() => setAnchorElT(null)} // Close dropdown when mouse leaves
                >
                  <Button
                    sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center',backgroundColor: Boolean(anchorElT) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    }}
                    onClick={(event) => setAnchorElT(anchorElT ? null : event.currentTarget)} 
                    aria-expanded={Boolean(anchorElT)}
                  >
                    {page.name}
                    <ExpandMoreIcon sx={{ ml: 1 }} />
                  </Button>
                  <Menu
                    anchorEl={anchorElT}
                    open={Boolean(anchorElT)}
                    onClose={() => setAnchorElT(null)}
                    MenuListProps={{
                      onMouseLeave: () => setAnchorElT(null), // Close dropdown when mouse leaves the menu
                    }}
                    sx={{ mt: "45px" }}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                  >
                    {page.children.map((child) => (
                      <MenuItem
                        key={child.name}
                        component={Link}
                        href={child.url}
                        onClick={handleCloseTMenu}
                      >
                        {child.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={page.name}
                  component={Link}
                  href={page.url}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              )
            ))}
            </Box>
            
            {/*profile settings*/}
            {/* REMOVE 'DIPLAY NONE' FROM BELOW TO SHOW ACCOUNT SETTING */}
            <Box sx={{ flexGrow: 0, display:"none" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp">
                  <PersonIcon/>
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px'}}
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
