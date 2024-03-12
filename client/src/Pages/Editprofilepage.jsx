import { Box, Divider } from "@mui/material"
import { Sidebar } from "../Components/Sidebar";
import { Editprofile } from "../Components/Editprofile";
export const Editprofilepage=({mode ,setMode})=>{
    return(
        <Box sx={{display:"flex"}} >
        <Box sx={{
                
                justifyContent:"space-between", display:{xs:"none", sm:"flex"}}}>
            <Sidebar mode={mode} setMode={setMode}/>
            <Divider orientation="vertical" />
            </Box>
            <Editprofile/>
        
        </Box>
  
    )
}