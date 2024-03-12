import { Avatar, Box, Stack, Typography } from "@mui/material"
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

 export const Suggestions=()=>{
    const Navigate=useNavigate();
    const {activeUser, suggestions}=useContext(UserContext);

const suggestionsHandler=async(profID)=>{
Navigate(`/profile/${profID}`);
}

    return(
        <Box sx={{
            // bgcolor:"yellow", 
         width:"25%", height:"100vh", flexDirection:"column", gap:"20px", display:{lg:"flex", md:"none", sm:"none", xs:"none"}, p:{md:"10px", lg:"20px"}, marginLeft:"10px"}}>

<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{marginTop:"15px"}}>
<Stack direction="row" gap="10px" alignItems="center">
    <Avatar src={`${activeUser?.profilePic}`}/>
    <Box sx={{fontWeight:600, fontSize:"16px"}}>
    {/* {localStorage.getItem("username")} */}
    {activeUser?.username}
    </Box>
    </Stack>
    {/* <Typography>
        Switch
    </Typography> */}
</Stack>


<Stack direction="row" justifyContent="space-between" alignItems="center" >
    <Typography>
        Suggested for you
    </Typography>
    {/* <Typography>
        See All
    </Typography> */}
</Stack>

{
    suggestions.map((item)=>{
        return (<Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{display:"flex", gap:"10px", alignItems:"center", cursor:"pointer"}} onClick={()=>suggestionsHandler(item._id)}>
        <Avatar src={`${item?.profilePic}`}/>
        <Box>
        <Typography>
        {item.username}
        </Typography>
        <Typography variant="caption">
       Recommended by ConnectHub
        </Typography>
        </Box>
        </Box>
       
        {/* <Typography sx={{cursor:"pointer"}}>
            Follow
        </Typography> */}
    </Stack>)
    })
}




{/* <Stack direction="row" justifyContent="space-between" alignItems="center">
    <Box sx={{display:"flex", gap:"10px", alignItems:"center"}}>
    <Avatar/>
    <Box>
    <Typography>
    username 1
    </Typography>
    <Typography>
   Followed by User
    </Typography>
    </Box>
    </Box>
   
    <Typography>
        Follow
    </Typography>
</Stack> */}



                
            </Box>
    )
}