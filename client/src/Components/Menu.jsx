import { Logout, PersonAdd, Settings } from "@mui/icons-material"
import { Avatar, Box, Button, Divider, IconButton, InputBase, ListItemIcon, Menu, Paper, Typography } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/interceptor";
import UserContext from "../Contexts/UserContext";
import ModeNightIcon from '@mui/icons-material/ModeNight';

export const AccountsMenu=({ setAnchorEl, notification,  mode, setMode,  setNotifications, anchorEl, notifications, onsearch, setOnsearch})=>{
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const[searchItem, setSearchItem]=React.useState();
    const setsearch=Boolean(onsearch);
    const onNotification=Boolean(notifications);
    const navigate=useNavigate();
    const[val, setVal]=React.useState([]);
    const {activeUser}=React.useContext(UserContext);
    

console.log("notification", notification);
    const logoutHandler=()=>{
      localStorage.clear();
      navigate("/login");
      
    }

    const handleClose =() => {
        
        
        setAnchorEl(null);
        
        
      };

    
     

     const closesearchHandler=()=>{
        setOnsearch(null);
        setSearchItem("");
     }

     const closeNotification=()=>{
        setNotifications(null);
     }

     const searchUsersHandler=async(e)=>{
      const searchuser=e.target.value;
      let value=[];
      setSearchItem(e.target.value);
      try {
        const response=await axiosInstance("/users/search-users", {
          method:"POST",
          data:{
            searchuser
          }
        })
        value=response.data;
        
        setVal(value);
        
        
      } catch (error) {
        console.log(error);
      }
      
      
     }

     const profilePageHandler=async(username, id)=>{
      // console.log("hi")

// console.log("hi", response.data.message);

navigate(`/profile/${id}`);
setOnsearch(null);

     }


    
    return(
        <>


  {open&&   (<Menu
        anchorEl={anchorEl}
        // id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        
        
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        
      >

            <Box sx={{ width: 250 }}>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <BookmarkIcon fontSize="small"/> 
          </ListItemIcon>
          Saved
        </MenuItem>
        <Divider />
        {
          mode?(<MenuItem onClick={()=>setMode(false)}>
          <ListItemIcon>
            <LightModeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Light Mode
        </MenuItem>):(<MenuItem onClick={()=>setMode(true)}>
          <ListItemIcon>
            <ModeNightIcon fontSize="small" />
          </ListItemIcon>
          Dark Mode
        </MenuItem>)
        }
        
        
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        </Box>

        
    


        
      </Menu>)}
  
{
  setsearch&&  (<Menu
    anchorEl={onsearch}
    // id="account-menu"
    open={setsearch}
    onClose={closesearchHandler}
    // onClick={closesearchHandler}
    
    
    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    
  >

        <Box sx={{ width: 400 , height:"100vh"}}>
    <MenuItem >
    {/* <ListItemIcon>
        <Settings fontSize="small" />
      </ListItemIcon> */}
      <Typography variant="h6">Search</Typography>
    </MenuItem>
    <MenuItem >
    <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,height:"25px", background:"lightgrey" }}
          >
            
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e)=>searchUsersHandler(e)}
              value={searchItem}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <HighlightOffOutlinedIcon />
            </IconButton>
            
          </Paper>
    
    </MenuItem>
    <Divider />
    <MenuItem sx={{display:"flex", justifyContent:"space-between"}} onClick={closesearchHandler}>
      <Typography>Recent</Typography>
      <Typography sx={{cursor:"pointer"}}>Clear All</Typography>
    </MenuItem>

    {searchItem&&(
      val?.map((item)=>{
        return (<MenuItem sx={{display:"flex", justifyContent:"space-between"}} onClick={()=>profilePageHandler(item.username, item._id)}>
        <ListItemIcon sx={{display:"flex", alignItems:"center"}}>
          <Avatar src={`${item?.profilePic}`}/>
          <Box><Typography sx={{color:"black"}}>{item?.username}</Typography>
        <Typography>Username 2 following</Typography></Box>
        </ListItemIcon>
        
        <HighlightOffOutlinedIcon />
        
      </MenuItem>
  )
      }))
    }
    
    






    </Box>

    



    
  </Menu>)
}


{
   onNotification&& (<Menu
        anchorEl={notifications}
        // id="account-menu"
        open={onNotification}
        onClose={closeNotification}
        onClick={closeNotification}
        
        
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        
      >

            <Box sx={{ width: 350, height:"100vh" }}>
        <MenuItem onClick={handleClose}>
        {/* <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings */}
          <Typography variant="h6">Notification</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Typography variant="subtitle2">Today</Typography>
        </MenuItem>
        <Divider />

        
{


    (activeUser.notification.length!==0)&&
    activeUser.notification.map((item)=>{
      if(item.type===1){
        return (<MenuItem sx={{display:"flex", justifyContent:"space-between"}} >
        <ListItemIcon sx={{display:"flex", alignItems:"center", gap:"10px", width:"50px", }}>
          <Avatar />
          
              <Typography variant="caption">{item?.senderName} liked your post <br/> 20hr </Typography>
              
        
        
        </ListItemIcon>
        
        
        
        
        
      </MenuItem>)
      }
      else if(item.type===2){
        return (<MenuItem sx={{display:"flex", justifyContent:"space-between"}} >
        <ListItemIcon sx={{display:"flex", alignItems:"center", gap:"10px", width:"50px", }}>
          <Avatar />
          
              <Typography variant="caption" component="h1" sx={{color:"black"}}>{item?.senderName} started following <br/>you 4hr</Typography>
              
        
       
        </ListItemIcon>
        
        
        <Button sx={{textTransform:"none"}} variant="contained" size="small">Follow</Button>
        
      </MenuItem>)
      }
      else return null;
      
    })

    

}

        </Box>

        
    


        
      </Menu>)
}






       
        </>
        
     
        
    )
}