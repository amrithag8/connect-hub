import { AccountCircle } from "@mui/icons-material"
import { AppBar, Avatar, Badge, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import InputBase from '@mui/material/InputBase';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Logout, Settings } from "@mui/icons-material"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import { MessageContext } from "../Contexts/MessageContext";
import HomeIcon from '@mui/icons-material/Home';


export const Appbar=({mode ,setMode, setTriggerPost})=>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Navigate=useNavigate();
    const {activeUser}=React.useContext(UserContext);
    const {unReadCount}=React.useContext(MessageContext);


   

    const handleProfileMenuOpen = (event) => {
    
        setAnchorEl(event.currentTarget);
      };
    

    const menuId = 'primary-search-account-menu';
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
      };
    
      const logoutHandler=()=>{
        localStorage.clear();
        Navigate("/login");
        setAnchorEl(null);
        
      }

    const renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={()=>{Navigate("/"); setAnchorEl(null);}}> <ListItemIcon><HomeIcon/></ListItemIcon>Home</MenuItem>
          {/* <MenuItem onClick={handleMenuClose}> <ListItemIcon><ExploreOutlinedIcon/></ListItemIcon>Explore</MenuItem> */}
          <MenuItem onClick={()=>{setTriggerPost(true); setAnchorEl(null);}}> <ListItemIcon><AddBoxOutlinedIcon/></ListItemIcon>Create</MenuItem>
          <MenuItem onClick={handleMenuClose}> <ListItemIcon><Settings/></ListItemIcon>Settings</MenuItem>
          <MenuItem onClick={()=>{Navigate("/profile");setAnchorEl(null); }}> <ListItemIcon><Avatar src={`${activeUser?.profilePic}`} sx={{width:"30px", height:"30px"}}/></ListItemIcon>Profile</MenuItem>
          {
            mode?(<MenuItem onClick={()=>{setMode(false); setAnchorEl(null);}}> <ListItemIcon><LightModeOutlinedIcon/></ListItemIcon>Light Mode</MenuItem>):
            (<MenuItem onClick={()=>{setMode(true); setAnchorEl(null);}}> <ListItemIcon><ModeNightIcon/></ListItemIcon>Dark Mode</MenuItem>)
          }
          
          <MenuItem onClick={logoutHandler}> <ListItemIcon><Logout/></ListItemIcon>Logout</MenuItem>
        </Menu>
      );
    




    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));


      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));
    return(
        <>
        {
          localStorage.getItem("AccessToken") && (<AppBar position="sticky" 
          sx={{display:{xs:"block", sm:"none"}}}
          >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={()=>Navigate("/inbox")}>
                <Badge badgeContent={`${unReadCount}`} color="error">
                  <ChatIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <FavoriteIcon/>
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar src={`${activeUser?.profilePic}`} sx={{width:"30px", height:"30px"}}/>
              </IconButton>
            </Box>
            {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}> */}
              {/* <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              > */}
                {/* <MoreIcon /> */}
              {/* </IconButton> */}
            {/* </Box> */}
          </Toolbar>
        </AppBar>)
        }
        
      {renderMenu}
    </>
    )
}