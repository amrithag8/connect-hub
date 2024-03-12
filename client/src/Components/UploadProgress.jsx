import { Box } from '@mui/material'
import React from 'react'

function UploadProgress({loaded}) {
  return (
    <Box sx={{height:"20px", width:"20%", border:"2px solid"}}>
    <Box sx={{height:"20px", width:`${loaded}%`, backgroundColor:"gray", zIndex:99}}>
     {loaded}%
    </Box>
    </Box>
  )
}

export default UploadProgress
