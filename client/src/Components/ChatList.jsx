import { Avatar, Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import io from 'socket.io-client';
import moment from 'moment';
import {format} from 'timeago.js';
import {  useParams } from 'react-router-dom';
import { axiosInstance } from '../utils/interceptor';
import EmojiPicker from 'emoji-picker-react';
import { MessageContext } from '../Contexts/MessageContext';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';



const Chatlist=({selectedUser
  ,  activeUser,  setUserSearch, userSearch, sendMessage})=> {

const {setReceivedmsg, setMessage,receivedmsg, message}=useContext(MessageContext);

    const[emojiOepn, setEmojiOpen]=useState(false);
    const[emojiIcon, setEmojiIcon]=useState(null);
  const {id}=useParams();
  const scrollRef=useRef();
  const emojiRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        
        setEmojiOpen(false);
      }
    };
    
    // Add event listener when EmojiPicker is open
    if (emojiOepn) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove event listener when EmojiPicker is closed
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emojiOepn]);

  useEffect(()=>{
scrollRef.current?.scrollIntoView();
  },[receivedmsg])

  const deleteMsgHandler=async(id)=>{
const res=await axiosInstance("/messages/delete-messages", {
  method:"DELETE", 
  data:{receiverID:id, senderID:activeUser._id}
})
console.log("deleted Array", res.data);
setReceivedmsg(res.data);

  }

  const emojiHandler=(event, emojiObject)=>{
    // console.log("t is", emojiObject);
    // console.log("event", event);
    // setEmojiIcon(event);
    const cursorPosition = document.getElementById('messageInput').selectionStart;
    const newMessage =
      message.substring(0, cursorPosition) +
      event.emoji +
      message.substring(cursorPosition);
    setMessage(newMessage);
  }

  console.log("received", receivedmsg)
 
  return (
   selectedUser&& (<Box sx={{width:{md:"60%", xs:"100%"}, 

 display:{md:"flex", xs:userSearch?"flex":"none"}, flexDirection:"column",  p:"20px" , 
 

}}>
  <Box sx={{position:"sticky", top:0, right:0, height:"100px", bgcolor:"white", width:"100%", p:"0 20px"}}>
  <Box sx={{display:"flex", gap:"10px", alignItems:"center", mb:"10px"}}>
<ArrowBackTwoToneIcon sx={{display:{md:"none", xs:"block", cursor:"pointer"}}} onClick={()=>setUserSearch(false)}/>
  <Avatar src={`${selectedUser?.profileUser?.profilePic}`}/>
  <Typography variant='h5'>{selectedUser?.profileUser?.fullName}</Typography>
  </Box>
  <Button onClick={()=>deleteMsgHandler(selectedUser?.profileUser?._id)}>Delete All msgs</Button>
  
  <Divider orientation='horizontal' sx={{width:"100%"}}/>
  </Box>

  {/* <Box sx={{width:"100%", 

display:{sm:"flex", xs:"none"}, flexDirection:"column", p:"20px" , overflow:"auto",marginBottom: '70px'

}}> */}

  {/* <Box sx={{width:"100%", 

display:{sm:"flex", xs:"none"}, flexDirection:"column", p:"20px" ,    marginBottom: '70px'

}}> */}


<Box  sx={{width:"100%", height:"500px",

display:"flex", flexDirection:"column", pb:"50px" , pr:"20px", overflowY:"scroll",
'&::-webkit-scrollbar':{
  width:10,
 
},
'&::-webkit-scrollbar-track':{
  backgroundColor:""
} ,
'&::-webkit-scrollbar-thumb':{
  backgroundColor:"gray",
  borderRadius:"5px"
  
  
}  

}}>

  {


    (receivedmsg?.map((item)=>{
     return (item.senderID!==activeUser._id)?
       ( <><Box ref={scrollRef} sx={{maxWidth:{md:"400px", sm:"200px"},
      width:"auto",minHeight:"auto",  p:"10px", border:"1px solid gray", mt:"10px",ml:"auto",bgcolor:"lightyellow", borderTopRightRadius:"30px",borderTopLeftRadius:"30px", borderBottomLeftRadius:"30px" }}>
    <Typography sx={{color:item.unread? 'green': 'black'}}>{item.content} </Typography>
    <Typography variant="caption">{format(item.createdAt)}</Typography>
  </Box></>):( <Box ref={scrollRef} sx={{maxWidth:{md:"400px", sm:"200px"},
      width:"auto",minHeight:"auto", p:"10px", border:"1px solid gray", mt:"10px",mr:"auto",bgcolor:"lightblue", borderTopRightRadius:"30px",borderTopLeftRadius:"30px", borderBottomRightRadius:"30px"}}>
    <Typography sx={{color:item.unread? 'green': 'black'}}>{item.content}</Typography>
    <Typography variant="caption" >{format(item.createdAt)} </Typography>
  </Box>)
    }))
  }

</Box>
  


  <Box sx={{display:"flex", width:{md:"55%", xs:"85%"}, justifyContent:"space-between", height:"50px", p:"0px 15px",zIndex:"1", position:"fixed", bottom:0, right:"20px", alignItems:"center", border:"1px solid gray", bgcolor:"white", borderRadius:"30px", mt:"20px"}}>
  <Box ref={emojiRef} sx={{position:"absolute", bottom:"120px", width:400, height:400}}><EmojiPicker open={emojiOepn} autoFocusSearch	onEmojiClick={emojiHandler}/></Box>
  <Box sx={{cursor:"pointer"}} onClick={()=>setEmojiOpen(true)}>😊 </Box>
  <TextField  placeholder='Add message' variant="outlined" value={message} id="messageInput" sx={{width:{sm:"100%", xs:"100%"}, zIndex:"1", border: 'none', "& fieldset": { border: 'none' }}} onChange={(e)=>setMessage(e.target.value)}/> 
<SendOutlinedIcon sx={{cursor:"pointer"}} onClick={()=>sendMessage(selectedUser?.profileUser?._id)}/>

  </Box>
</Box>)
  )
}

export default Chatlist;
