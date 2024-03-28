import { Box, CardMedia } from '@mui/material'
import React, { useState } from 'react';

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';


function PostComponent({item}) {
    const[currentIndex, setCurrentIndex]=useState(0);


    const handleNext = (length) => {
        console.log("length", length);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
      };
    
      const handlePrev = (length) => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? length - 1 : prevIndex - 1
        );
      };
  return (
    
        item?.image?.length > 1 ?
      (<Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center", position:"relative"}}>
       
       <ArrowCircleLeftOutlinedIcon sx={{cursor:"pointer", fontSize:"20px", position:"absolute", left:"2px"}} onClick={()=>handlePrev(item.image.length)}/>
       
       {
        item?.image[currentIndex]?.type==='image'?(<CardMedia
          component="img"
          height="400"
          image={`${item?.image[currentIndex]?.imageUrl}`}
          alt="image"
          sx={{objectFit:"contain"}}
          
        />):(<CardMedia
          component="video"
          height="400"
          image={`${item?.image[currentIndex]?.imageUrl}`}
          alt="Paella dish"
          autoPlay
          loop
          controls
        />)
       } 
      <ArrowCircleRightOutlinedIcon sx={{cursor:"pointer", fontSize:"20px", position:"absolute", right:"2px"}} onClick={()=>handleNext(item.image.length)}/>
            
            </Box>):(
              (item.image.length===1) &&

              (item?.image[0]?.type==='image')?
              
               (<CardMedia
                 component="img"
                 height="400"
                 image={`${item?.image[0]?.imageUrl}`}
                 alt="image"
                 sx={{objectFit:"contain"}}
               />):(<CardMedia
                component="video"
                height="400"
                image={`${item?.image[0]?.imageUrl}`}
                alt="Paella dish"
                autoPlay
                loop
                controls
              />))
             

            
                   
            
                  
            
      
  )
}

export default PostComponent
