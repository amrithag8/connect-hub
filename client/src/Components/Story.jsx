import Box from '@mui/material/Box';
import { Avatar, AvatarGroup, Card, Container, Stack} from '@mui/material';
// import styled from '@emotion/styled';
import {styled} from "@mui/material/styles";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { StoryContext } from '../Contexts/StoryContext';
import UserContext from '../Contexts/UserContext';
export const Story = () => {

  const {setTriggerStory, allStory}=useContext(StoryContext);
  const {activeUser}=useContext(UserContext);
  
  

  const Navigate=useNavigate();

  const scrollRef=useRef();

  // const theme = createTheme({
  //   breakpoints: {
  //     values: {
  //       xs: 0,
  //       sm: 600,
  //       md: 900,
  //       lg: 1200,
  //       xl: 1536,
  //     },
  //   },
  // });

  const arrowLeftClickHandler=()=>{
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 500; // Add 500 to the current scroll position
    }
  }
  

  const arrowRightClickHandler=()=>{
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 500; // Add 500 to the current scroll position
    }
  }

  const storyHandler=(storyID)=>{
    console.log(storyID);
    Navigate(`/story/${storyID}`);
  }

  const Border=styled(Avatar)(({theme})=>({
     background:`radial-gradient(rgba(0,0,0,0.15) 55%, transparent 0),
    radial-gradient(white 65%, transparent 0), 
    linear-gradient(to top right, #00cc99, #0066ff)`,

    [theme.breakpoints.up("md")]:{
width:60,
height:60
    },
    [theme.breakpoints.up("lg")]:{
      width:70,
      height:70
          },
          [theme.breakpoints.down("md")]:{
            width:50,
            height:50
                },

  }))

  // const Image=styled(Avatar)(({theme})=>{
  //   cursor:"pointer"
  // })
  return(
    
   <div style={{overflow:"hidden", width:"90%", display:"flex", justifyContent:"space-between", alignItems:"center"}}>

<ArrowCircleLeftOutlinedIcon onClick={arrowLeftClickHandler} sx={{
        // position:"absolute", top:"25%", left:0, zIndex:99, 
      cursor:"pointer"}}/>
    <Container ref={scrollRef} sx={{display:"flex", gap:"17px", alignItems:"center", position:"relative",width:{sm:"100%", xs:"90%"}, justifyContent:"flex-start", overflowX:"scroll", scrollBehavior:"smooth", '&::-webkit-scrollbar': {
            width: '0 !important', /* Safari */
          },}}>
      

      

      
   
     <Box 
     onClick={()=>setTriggerStory(true)}
     >
      
<Avatar sx={{width:{lg:60, md:50}, position:"relative", height:{lg:60, md:50}, cursor:"pointer"}} src={activeUser?.profilePic}/>
<AddIcon sx={{position:"absolute", cursor:"pointer", zIndex:20}}/>
</Box>


{
  allStory?.map((story)=>{
    return(<Border onClick={()=>storyHandler(story?._id)}>
    <Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src={story?.storyPostedBy?.profilePic}/>
    </Border>)
  })
}
{/* <Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>
<Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>


 <Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>
<Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>
<Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>


 <Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>
<Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>
<Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>
<Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>
<Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/>
</Border>
<Border onClick={(e)=>storyHandler(e)}>
<Avatar sx={{width:{lg:60, md:50}, height:{lg:60, md:50}, cursor:"pointer"}} src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"/> 
</Border>  */}



</Container>
<ArrowCircleRightOutlinedIcon onClick={arrowRightClickHandler} sx={{
  // position:"absolute", top:"25%",  right:0, zIndex:99, 
  cursor:"pointer"}}/>
</div>

  )
    
  };
  