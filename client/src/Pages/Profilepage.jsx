import { Sidebar } from "../Components/Sidebar";
import { Profile } from "../Components/Profile";
import { Box, Divider, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

export const Profilepage=({mode, setMode})=>{
    
    return(
        <Box sx={{display:"flex", justifyContent:"space-evenly"}} >
        <Box sx={{
                
                gap:"20px", display:{xs:"none", sm:"flex"}, p:"15px"}}>
            <Sidebar  mode={mode} setMode={setMode}/>
            <Divider orientation="vertical" />
            </Box>
        <Profile />
        </Box>

    )
}