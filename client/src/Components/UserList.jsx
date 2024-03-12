import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountsMenu } from "./Menu";
import * as React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { axiosInstance } from "../utils/interceptor";
import { useParams } from "react-router-dom";

export const UserList = ({
  
  setSelectedUser,
  setReceivedmsg,
  activeUser,
  setUserSearch,
  userSearch,
  inboxMessages, 
  
  
  
}) => {
  const [searchedUser, setSearchedUser] = React.useState();
  const [userList, setUserList] = React.useState(null);
  const[isRead, setIsRead]=React.useState(null);

  const { id } = useParams();
  const Navigate = useNavigate();

  const HandleUserSearch = async (e) => {
    setUserList(e.target.value);
    try {
      const response = await axiosInstance("/users/search-users", {
        method: "POST",
        data: {
          searchuser: e.target.value,
        },
      });

      console.log("searcg", response.data);

      setSearchedUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleUserClick = async (id, index) => {
    setIsRead( id);
    setUserList(null);
    try {
      const response = await axiosInstance(`/users/profile/${id}`, {
        method: "POST",
      });
      console.log("user", response.data);
      setSelectedUser(response.data);
      setUserSearch(true);
    } catch (error) {
      console.log(error);
    }
    // Navigate(`/inbox/${id}`);
    getAllMessages(id);
  };

  const getAllMessages = async (id) => {
    try {
      const response = await axiosInstance("/messages/allmessages", {
        method:"PUT",
        data: {
          senderID: activeUser._id,
          receiverID: id,
        },
      });
      console.log(response.data);

      const updatedMessages = response.data.map(message => ({
        ...message,
        unread: true // Assuming all messages are initially unread
      }));

      console.log("updatedMessages", updatedMessages);

      setReceivedmsg(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        width: {md:500, xs:userSearch? "0%":"100%"},
        height: "100vh",
        display: {xs:userSearch?"none":"flex", md:"flex"},
        flexDirection: "column",
        gap: "30px",
        overflow:"auto"
      }}
    >
      <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
        <MenuItem>
          <Typography variant="h5">{activeUser?.username}</Typography>
        </MenuItem>
        <MenuItem>
          <AddCommentOutlinedIcon />
        </MenuItem>
      </ListItem>

      <MenuItem>
        <Typography variant="h6">Messages</Typography>
      </MenuItem>

      <InputBase
        value={userList}
        placeholder="Search"
        onChange={(e) => HandleUserSearch(e)}
      />

      {
      userList &&
        searchedUser?.map((item) => {
          return (
            <>
              <MenuItem
                sx={{ display: "flex", justifyContent: "space-between" }}
                onClick={() => HandleUserClick(item?._id )}
              >
                <ListItemIcon
                  sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Avatar
                    src={`${item?.profilePic}`}
                  />
                  <Box>
                    <Typography sx={{ color: "black" }}>
                      {item?.fullName}
                    </Typography>
                    {/* <Typography>Username 2 following</Typography> */}
                  </Box>
                </ListItemIcon>
              </MenuItem>
            </>
          );
        })
        }


        {
          inboxMessages.length!==0 &&

          inboxMessages?.map((item, index) => {
            return (
              <>
              
                <MenuItem
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  onClick={() => {item?.receiverInfo?._id===activeUser._id?HandleUserClick(item?.senderInfo?._id , index):
                    HandleUserClick(item?.receiverInfo?._id, index )}}
                >
                  <ListItemIcon
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >

                    {
                      item?.receiverInfo?._id===activeUser?._id?(<Avatar
                        src={`${item?.senderInfo?.profilePic}`}
                      />):(<Avatar
                        src={`${item?.receiverInfo?.profilePic}`}
                      />)
                    }
                   
                   
                    <Box sx={{display:"flex", flexDirection:"column"}}>
                    {
                      item.receiverInfo?._id===activeUser?._id?( <Typography sx={{ color: "black" }}>
                      {item?.senderInfo?.fullName}
                    </Typography>):( <Typography sx={{ color: "black" }}>
                        {item?.receiverInfo?.fullName}
                      </Typography>)}

                     
                      {/* <Typography>Username 2 following</Typography> */}
                      {/* <Box sx={{width:"150px"}}> */}
                      {
                        ((item.senderInfo._id===activeUser._id)||(isRead===item.senderInfo._id)||(isRead===item.receiverInfo._id))?(<Typography variant="caption" sx={{maxWidth:"300px", whiteSpace:"pre-wrap", fontWeight:"normal", color:'gray'}}>{item.content}
                        </Typography>):(<Typography variant="caption" sx={{maxWidth:"300px", whiteSpace:"pre-wrap", fontWeight:item.unRead?'bold':"normal", color:item.unRead?'black':'gray'}}>{item.content}
                        </Typography>)
                      }
                        

                      
                     
{/* </Box> */}
                    </Box>
                  </ListItemIcon>
                </MenuItem>
              </>
            );
          })}
  
        
    </Box>
  );
};
