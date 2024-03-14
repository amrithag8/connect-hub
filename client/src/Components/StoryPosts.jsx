import {
    Box,
    Button,
    Container,
    Divider,
    Input,
    InputLabel,
    
    TextField,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React, { useContext, useRef, useState } from "react";
  import CloseIcon from "@mui/icons-material/Close";
  import CollectionsSharpIcon from "@mui/icons-material/CollectionsSharp";
  import axios from "axios";
  import { axiosInstance } from "../utils/interceptor";
  import { Navigate, useNavigate } from "react-router-dom";
  import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
  import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
  // import {  toast } from 'react-toastify';

  import cloudinary from 'cloudinary-core'; 
  
  import { PostsContext } from "../Contexts/PostsContext";
import { StoryContext } from "../Contexts/StoryContext";
  
  
  function StoryPosts() {
    const { setLoaded }=useContext(PostsContext);
    const {setTriggerStory}=useContext(StoryContext);
    const [imagePreview, setimagePreview] = useState([]);
    const [photoPost, setPhotoPost] = useState(false);
    const [image, setImage] = useState([]);
    // const [title, setTitle] = useState(null);
    const [caption, setCaption] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    // const[loaded, setLoaded]=useState();
    // const videoRef = useRef(null);
  
    // const cloudName = 'dj1wvmlcq';
    //   const uploadPreset = 'connect-hub';
  
    // const cloudinaryInstance = cloudinary.Cloudinary.new({ cloud_name: cloudName });
  
    const navigate = useNavigate();
  
    const changeHandler = (e) => {
      console.log("file", e.target.files[0]);
      const files=e.target.files[0];
      
      
      setimagePreview(files)
  
      const previews=[];
    //   for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
  
        
        // const fileUrl = files;
  
        
        const fileType = files.type.startsWith('image/') ? 'image' : 'video';
  
        
        previews.push({ url: files, type: fileType });
    // };
  
    setImage(previews);
  }
  
    // const handleNext = () => {
    //   setActiveIndex((prevIndex) => (prevIndex + 1) % imagePreview.length);
    // };
  
    // const handlePrev = () => {
    //   setActiveIndex((prevIndex) =>
    //     prevIndex === 0 ? imagePreview.length - 1 : prevIndex - 1
    //   );
    // };
  
    const nextPostHandler = () => {
      setPhotoPost(true);
      console.log("image", image);
      
  
    };
  
    const onUploadProgress = (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      if (percent < 100) {
        console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
        console.log("loaded:", loaded, "total:", total, "percent:", percent);
        setLoaded(percent);
      }
    };
    
  
    const postStoryHandler = async () => {
      setTriggerStory(false);
      // console.log("title", title , image, caption);
    
  
      
  let postArr=[];
  
  
      const formData = new FormData();
      formData.append("upload_preset", "connect-hub");
      formData.append("cloud_name","dj1wvmlcq");
      
      // for(let i=0; i<imagePreview.length; i++){
  
    formData.append("file", image[0].url);
    // formData.append(`type[${i}]`, image[i].type);
  
    const res=await axios("https://api.cloudinary.com/v1_1/dj1wvmlcq/auto/upload",{
      method:"POST",
      headers:{
        "Content-Type":"multipart/form-data"
      },
      data:
        formData,
        onUploadProgress
      
    })
  
    console.log("createstory", res.data);
    // formData.append("media[]",res.data );
    postArr.push(res.data);
    // formData.append("type[]",res.data.resource_type );
  
    
     
      // }
  
      
      // formData.append("title", title);
      // formData.append("caption", caption);
  
      // console.log("formdata", formData);
      
      try {
        const response = await axiosInstance("/story/post-new-story", {
          method: "POST",
  
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
          data: {postArr, caption},
        });
        alert(response.data.message);
      }
        
       catch (error) {
        alert(error.response.data.message);
      }
  
      window.location.reload();
    };
  
    return (
      <>
        {photoPost ? (
          <Container
            maxWidth="xl"
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.4)",
              zIndex: "99",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CloseIcon
              sx={{
                position: "absolute",
                top: "10%",
                right: "10%",
                cursor: "pointer",
                color: "white",
                fontSize: "35px",
                fontWeight: 800,
              }}
              onClick={() => setTriggerStory(false)}
            />
            {/* <Box sx={{position:"absolute", top:"10%", right:80, cursor:"pointer", color:"white", fontSize:"28px"}}>X</Box> */}
            <Container
              sx={{
                width: { sm: "60%", xs: "100%" },
                height: "550px",
                bgcolor: "white",
                borderRadius: "10px",
                display: "flex",
                mt: { sm: "10%", xs: "50%" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <Container sx={{width:{sm:"30%", xs:"100%"}, height:"500px", display:"flex", gap:"20px",mt:{sm:"10%", xs:"50%"},flexDirection:"column", alignItems:"center"}}> */}
  
              <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
   
   {/* <ArrowBackIosIcon sx={{cursor:"pointer"}} onClick={handlePrev}/> */}
   {
    image[activeIndex].type==='image'?(<img
      style={{ maxWidth: "350px",width:"100%", height: "350px" }}
      src={URL.createObjectURL(image[activeIndex].url)}
    />):(
    <video width="350" height="350" autoPlay controls>
    <source src={URL.createObjectURL(image[activeIndex].url)} type="video/mp4"/>
    Your browser does not support the video tag.
  </video>
  )
   }
   
  {/* <ArrowForwardIosIcon sx={{cursor:"pointer"}} onClick={handleNext}/> */}
       
  </Box>
              {/* <Box
                component="img"
                src={imagePreview}
                sx={{
                  width: { md: "400px", sm: "200px", xs: "100px" },
                  height: { md: "400px", sm: "200px", xs: "100px" },
                }}
              ></Box> */}
              {/* <img style={{width:{sm:"400px", xs:"150px"}, height:{sm:"450px", xs:"150px"}}} src={imagePreview}/> </> */}
  
              <Divider orientation="vertical" sx={{ ml: "20px" }} />
  
              <Container
                sx={{
                  width: { sm: "60%", xs: "100%" },
                  height: "550px",
                  display: "flex",
                  mt: { sm: "10%", xs: "50%" },
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  sx={{ width: { sm: "100%", xs: "100%" } }}
                  onChange={(e) => setTitle(e.target.value)}
                /> */}
  
                <TextField
                  sx={{ marginTop: "20px", width: { sm: "100%", xs: "100%" } }}
                  id="outlined-basic"
                  label="Caption"
                  variant="outlined"
                  multiline
                  rows={6}
                  onChange={(e) => setCaption(e.target.value)}
                />
  
                <Button
                  variant="contained"
                  sx={{ textTransform: "none", marginTop: "20px" }}
                  onClick={postStoryHandler}
                >
                  Post Story
                </Button>
              </Container>
  
              
            </Container>
          </Container>
        ) : (
          <Container
            maxWidth="xl"
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: "rgba(0,0,0,0.4)",
              zIndex: "99",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CloseIcon
              sx={{
                position: "absolute",
                top: "12%",
                right: "25%",
                cursor: "pointer",
                color: "white",
                fontSize: "35px",
                fontWeight: 800,
              }}
              onClick={() => setTriggerStory(false)}
            />
            {/* <Box sx={{position:"absolute", top:"10%", right:80, cursor:"pointer", color:"white", fontSize:"28px"}}>X</Box> */}
  
            <Container
              sx={{
                width: { sm: "40%", xs: "100%" },
                height: "500px",
                bgcolor: "white",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                mt: { sm: "10%", xs: "50%" },
                alignItems: "center",
              }}
            >
              <Typography>Post New Story</Typography>
              <Divider orientation="horizontal" sx={{ width: "100%" }} />
  
              {(imagePreview.length!==0) ? 
              
  (
    <>
    <Box sx={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
   
    {/* <ArrowBackIosIcon sx={{cursor:"pointer", fontSize:"30px"}} onClick={handlePrev}/> */}
  
    {
      image[activeIndex].type==='image'?(<img
        style={{ maxWidth: "350px",width:"100%", height: "350px" }}
        src={URL.createObjectURL(image[activeIndex].url)}
      />):(<video maxWidth="350" width="100%" height="350" autoPlay controls>
        <source src={URL.createObjectURL(image[activeIndex].url)} type="video/mp4"/>
        Your browser does not support the video tag.
      </video>)
    }
    
  {/* <ArrowForwardIosIcon sx={{cursor:"pointer", fontSize:"30px"}} onClick={handleNext}/> */}
        
  </Box>
  
  
  <Button
  variant="contained"
  sx={{ textTransform: "none" }}
  onClick={nextPostHandler}
  >
  Next
  </Button>  
  
  </>
  
  )
  
  
  
    
      
  
  
  
  
              
               : (
                <>
                  <Toolbar />
                  <CollectionsSharpIcon
                    sx={{ width: "150px", height: "150px" }}
                  />
                  <Typography>Select photos and videos here</Typography>
                  <Input
                    type="file"
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    accept="image/*, video/*"
                    // inputProps={{ multiple: true }}
                    onChange={(e) => changeHandler(e)}
                  />
                  {/* <Button variant="contained" sx={{ textTransform: "none" }}>
                    Select from computer
                  </Button> */}
                  <InputLabel htmlFor="outlined-button-file" variant="outlined">
                  Select from computer
        </InputLabel>
                </>
              )}
            </Container>
            
          </Container>
        )}
      </>
    );
  }
  
  export default StoryPosts;
  