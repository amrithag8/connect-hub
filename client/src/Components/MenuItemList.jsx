import { Avatar, Badge, Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountsMenu } from "./Menu";
import * as React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "../Contexts/MessageContext";

export const MenuItemList=({setTriggerPost,  activeUser })=>{
    // const drawerWidth=240;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { unReadCount, setMessageOpen,messageOpen}=React.useContext(MessageContext);
    
    let messageState=Boolean(messageOpen);
    const navigate=useNavigate();
    const [onsearch, setOnsearch]=React.useState(null);
    const [notifications, setNotifications]=React.useState(null);
    React.useEffect(()=>{
      setMessageOpen(true);
    },[]);
    const handleClick = (event) => {
      if(event.currentTarget){
        setAnchorEl(event.currentTarget);
      }
      else{
        setAnchorEl(null);
      }
    };
    

    const searchHandler=(e)=>{
      // alert(e.currentTarget.parentElement);
      if(e.currentTarget){
        setOnsearch(e.currentTarget.parentElement);
      }
    }

    const notificationHandler=(e)=>{
      setNotifications(e.currentTarget.parentElement)
    }

    const messageHandler=(e)=>{
      
navigate("/inbox");
setMessageOpen(true);




    }

    // console.log("message", messageOpen);

    const homePagenavigate=()=>{
      setMessageOpen(false);
      navigate("/");
    }

    const profileHandler=()=>{
      setMessageOpen(false);
      navigate("/profile");
    }
    return(


      
        <Box sx={{width:"10%"}}>
        <AccountsMenu  anchorEl={anchorEl} setAnchorEl={setAnchorEl} setNotifications={setNotifications} onsearch={onsearch} notifications={notifications} setOnsearch={setOnsearch}/>
        <Toolbar />
        
              <Toolbar />
              {
              !messageOpen&&<Typography variant="h5" sx={{fontSize:"30px" , fontWeight:"bolder"}}>Connect App</Typography>}
              
            
        
        <List sx={{"& a":{
          textDecoration:"none",
          color:"black"
        }}}>
          
             <ListItemButton onClick={homePagenavigate}>
                <ListItemIcon>
                <HomeIcon/>
                 
                </ListItemIcon>
            {
              !messageOpen&&(<ListItemText  primary="Home" />)
            }  
              
              </ListItemButton>
              
            

          <ListItemButton onClick={(e)=>searchHandler(e)}>
                <ListItemIcon>
                <SearchIcon/>
                 
                </ListItemIcon>
                {
              !messageOpen&&(<ListItemText  primary="Search" />)
            }  
                
              </ListItemButton>

              {/* <ListItemButton>
                <ListItemIcon>
                <ExploreOutlinedIcon/>
                 
                </ListItemIcon>
                {
              !messageOpen&&(<ListItemText  primary="Explore" />)
            }  

                
              </ListItemButton> */}


              {/* <ListItemButton>
                <ListItemIcon>
                <OndemandVideoIcon/>
                 
                </ListItemIcon>
                {
              !messageOpen&&(<ListItemText  primary="Reels" />)
            }  

                
              </ListItemButton> */}


              <ListItemButton onClick={(e)=>messageHandler(e)}>
                <ListItemIcon>
                  <Badge badgeContent={`${unReadCount}`} color="error">
                <ChatIcon/>
                </Badge>
                 
                </ListItemIcon>
                {
              !messageOpen&&(<ListItemText  primary="Messages" />)
            }  
                
              </ListItemButton>


              <ListItemButton onClick={(e)=>notificationHandler(e)}>
                <ListItemIcon>
                <FavoriteBorderIcon/>
                 
                </ListItemIcon>
                {
              !messageOpen&&(<ListItemText  primary="Notifications" />)
            }  
              </ListItemButton>


              <ListItemButton onClick={()=>setTriggerPost(true)}>
                <ListItemIcon>
                <AddBoxOutlinedIcon />
                 
                </ListItemIcon>
                {
              !messageOpen&&(<ListItemText  primary="Create" />)
            }  
              </ListItemButton>


               <ListItemButton onClick={profileHandler}>
                <ListItemIcon>
                <Avatar sx={{width:25, height:25}} src={`${activeUser?.profilePic}`}/>
                 
                </ListItemIcon>
                {
              !messageOpen&&(<ListItemText  primary="Profile" />)
            }  
                
              </ListItemButton>


        </List>
        <Divider />
        <List>
          
             <Toolbar/>
             {/* <Toolbar/> */}
              <ListItemButton onClick={(e)=>handleClick(e)}>
                <ListItemIcon >
                 <MenuIcon  />
                </ListItemIcon>
                {
              !messageOpen&&(<ListItemText  primary="More" />)
            }  
                
              </ListItemButton>
           
        </List>
        
      </Box>
    )
}