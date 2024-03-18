import {
  
  Box,
  Button,
  
  Divider,
  
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import React, { useContext, useEffect, useState } from "react";


import "./Messages.css";
import { MenuItemList } from "./MenuItemList";
import { UserList } from "./UserList";
import Chatlist from "./ChatList";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/interceptor";
import UserContext from "../Contexts/UserContext";
import { MessageContext } from "../Contexts/MessageContext";

const useStyles = makeStyles({
  root: {
    overflow: "hidden", // Disable scroll bars

    "&::-webkit-scrollbar": {
      width: 0,
      display: "none", // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
    },
  },
});

function Messages({
  setTriggerPost,

  sendMessage,

  
}) {
  // const classes = useStyles();
  const { activeUser } = useContext(UserContext);
  const { message, receivedmsg, setReceivedmsg, setMessageOpen, setMessage, unReadCount , messageOpen} =
    useContext(MessageContext);
  const [userSearch, setUserSearch] = useState(false);
  const [selectedUser, setSelectedUser] = React.useState();
  const [inboxMessages, setInboxMessages] = useState([]);

  // const[inboxUsers, setInboxUsers]=useState([]);

  const { id } = useParams();
  console.log("userSearch", userSearch);

  useEffect(() => {
    // Remove scrollbar from the body
    document.body.style.overflow = "hidden";

    // Restore scrollbar when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const OpenInbox = async () => {
      const response = await axiosInstance("/messages/", {
        params: {
          sender: activeUser?._id,
        },
      });
      console.log("messages1", response.data);
      setInboxMessages(response.data);
    };

    OpenInbox();
  }, [receivedmsg]);

  return (
        
        
    <Box sx={{ width: "100%", height: "100%" ,
    }}>
      <Box
        sx={{
          display: "flex",
          gap: "20px",

          width: "100%",
          
        }}

        // className={classes.root}
      >
        <Box sx={{ width: {md:"40%", xs:userSearch?"0%":"100%"}, gap: "50px", display: "flex",  overflowY:{xs:"scroll", sm:"unset"} 
 }}>
          <MenuItemList
            activeUser={activeUser}
            userSearch={userSearch}
            setTriggerPost={setTriggerPost}
            
          />
          <Divider orientation="vertical" />
          

          {inboxMessages.length !== 0 ? (


            
            <UserList
              setSelectedUser={setSelectedUser}
              setReceivedmsg={setReceivedmsg}
              setUserSearch={setUserSearch}
              userSearch={userSearch}
              activeUser={activeUser}
              inboxMessages={inboxMessages}
              
            />
          ) : (
            <UserList
              inboxMessages={inboxMessages}
              setSelectedUser={setSelectedUser}
              
              setReceivedmsg={setReceivedmsg}
              setUserSearch={setUserSearch}
              userSearch={userSearch}
              activeUser={activeUser}
              
            />
          )}

          <Divider orientation="vertical" sx={{display:{md:"block", xs:"none"}}} />
        </Box>

        {userSearch ? (
          <Chatlist
            
            activeUser={activeUser}
            sendMessage={sendMessage}
            userSearch={userSearch}
            selectedUser={selectedUser}
            setUserSearch={setUserSearch}
            
          />
        ) : (
          <Box
            sx={{
              width: "60%",

              display: { md: "flex", xs: "none" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Your message</Typography>
            <Button variant="contained">Send message</Button>
          </Box>
        )}
        
      </Box>
    </Box>
  );
}

export default Messages;
