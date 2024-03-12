import { Box, Button, Container, Divider, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from "react";
import { axiosInstance } from "../utils/interceptor";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PostsContext } from "../Contexts/PostsContext";

export const Editpost=()=>{

    const[editedTitle, setEditedTitle]=useState();
    const[editedCaption, setEditedCaption]=useState();
    const [activeIndex, setActiveIndex] = useState(0);
    const{editedPost, setChangePost, setPosts} =useContext(PostsContext);

    console.log("editedPost", editedPost)

    const editpostHandler=async(postID, title, caption)=>{
const response=await axiosInstance("/posts/editposts", {
    method:"PUT",
    data:{
        editedTitle:editedTitle||title, 
        editedCaption:editedCaption||caption, postID
    }
})

setChangePost(false);
setPosts(response.data);
    }


    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % editedPost?.image?.length);
      };
    
      const handlePrev = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? editedPost?.image?.length - 1 : prevIndex - 1
        );
      };

    return(
        <Container maxWidth="xl" sx={{position:"fixed", top:0, left:0, right:0, bottom:0, bgcolor:"rgba(0,0,0,0.4)", zIndex:"99", display:"flex", flexDirection:"column"
      
      }}>
  
          <CloseIcon sx={{position:"absolute", top:"10%", right:"10%", cursor:"pointer", color:"white", fontSize:"35px", fontWeight:800}} onClick={()=>setChangePost(false)}/>
          {/* <Box sx={{position:"absolute", top:"10%", right:80, cursor:"pointer", color:"white", fontSize:"28px"}}>X</Box> */}
          
          <Container sx={{width:{sm:"60%", xs:"100%"}, height:"550px", bgcolor:"white", borderRadius:"10px", display:"flex", mt:{sm:"10%", xs:"50%"}, justifyContent:"space-between", alignItems:"center"}}>
          {/* <Container sx={{width:{sm:"30%", xs:"100%"}, height:"500px", display:"flex", gap:"20px",mt:{sm:"10%", xs:"50%"},flexDirection:"column", alignItems:"center"}}> */}
  
        
          
          {/* <Box component="img" src={`http://localhost:3007/images/${editedPost.image[0].imageUrl}`} sx={{width:{md:"400px", sm:"200px", xs:"100px"}, height:{md:"400px", sm:"200px", xs:"100px"}}}></Box> */}
          {/* <img style={{width:{sm:"400px", xs:"150px"}, height:{sm:"450px", xs:"150px"}}} src={imagePreview}/> </> */}
          
          <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
 
 <ArrowBackIosIcon sx={{cursor:"pointer"}} onClick={handlePrev}/>
 {
  editedPost.image[activeIndex].type==='image'?(<img
    style={{ maxWidth: "350px",width:"100%", height: "350px" }}
    src={`http://localhost:3007/images/${editedPost.image[activeIndex].imageUrl}`}
  />):(
  <video style={{ pointerEvents: "none" }} width="350" height="350" autoPlay controls>
  <source src={`http://localhost:3007/videos/${editedPost.image[activeIndex].imageUrl}`} type="video/mp4"/>
  Your browser does not support the video tag.
</video>
)
 }
 
<ArrowForwardIosIcon sx={{cursor:"pointer"}} onClick={handleNext}/>
     
</Box>





          <Divider orientation='vertical' sx={{ml:"20px"}}/>

          <Container sx={{width:{sm:"60%", xs:"100%"}, height:"550px", display:"flex", mt:{sm:"10%", xs:"50%"}, flexDirection:"column", alignItems:"center"}}>
          <TextField id="outlined-basic" label="Title" variant="outlined" defaultValue={editedPost.title}  sx={{width:{sm:"100%", xs:"100%"}}} onChange={(e)=>setEditedTitle(e.target.value)}/>
          
          <TextField sx={{marginTop:"20px", width:{sm:"100%", xs:"100%"}}} defaultValue={editedPost.caption} id="outlined-basic" label="Caption" variant="outlined" multiline
  rows={6} onChange={(e)=>setEditedCaption(e.target.value)} />

<Button variant='contained' sx={{textTransform:"none", marginTop:"20px"}} onClick={()=>editpostHandler(editedPost.postID, editedPost.title, editedPost.caption )}>Edit</Button>

          </Container>

  
  
          {/* </Container> */}
          </Container>
         
      </Container>
    )
}