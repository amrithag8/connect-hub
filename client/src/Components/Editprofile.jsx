// import styled from "@emotion/styled";
import styled from 'styled-components';
import {
  Avatar,
  Box,
  Container,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from '../utils/interceptor';
import axios from 'axios';
import UserContext from '../Contexts/UserContext';


const Textfieldnew = styled(TextField)({
    // backgroundColor:"gray",

    

    
    "& .MuiInputBase-root": {
      height: "30px",

    //   width: { md: "350px", xs: "200px", sm: "250px" },
      // mb:"10px",
    },

    "& .MuiFilledInput-root": {
      paddingBottom: "20px",
    },

  });

export const Editprofile = () => {
  const fileInputRef = useRef(null);
  const{activeUser, setActiveUser}=useContext(UserContext);
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const[editedWebsite, setEditedWebsite]=useState(activeUser?.website);
  const[editedBio, setEditedBio]=useState(activeUser?.bio);
  const[selectedImage, setSelectedImage]=useState(null);
  
  
  var image='';
  // const[editedImg, setEditedImg]=useState();
  const Navigate=useNavigate();

  const handleButtonClick = () => {
    // Programmatically trigger the file input click when the text is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Handle the selected file as needed
    setSelectedImage(selectedFile);
    console.log('Selected File:', selectedFile);
  };

  // const handleEditFileChange=(event)=>{
  //   const selectedFile = event.target.files[0];
  //   // Handle the selected file as needed
  //   setEditedImg(selectedFile);
  //   console.log('Selected File:', selectedFile);
  // }


  const addProfileHandler =async () => {
    
    const Formdata=new FormData();
    

    Formdata.append("file", selectedImage);
    Formdata.append("upload_preset", "connect-hub");
    Formdata.append("cloud_name","dj1wvmlcq");

if(selectedImage!==null){

    try {

      const response=await axios("https://api.cloudinary.com/v1_1/dj1wvmlcq/image/upload",{
        method:"POST",
        headers:{
          "Content-Type":"multipart/form-data"
        },
        data:
          Formdata
        
      })
  
      console.log(response.data);
      image=response.data.url;

      
      
    } catch (error) {
      console.log(error)
    }
  }

    try {

      const res=await axiosInstance("/users/editProfile", {
        method:"POST", 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data:{
          website,
          bio,
          userID:activeUser._id,
          image
        }
    })
    console.log("addProf", res.data);
    setActiveUser(res.data);
    Navigate("/profile");
    window.location.reload(); 

      
    } catch (error) {
      console.log(error) 
    }



    
  };

  const editProfileHandler=async()=>{
    const Formdata=new FormData();

    
    Formdata.append("file", selectedImage);
    Formdata.append("upload_preset", "connect-hub");
    Formdata.append("cloud_name","dj1wvmlcq");
    if(selectedImage!==null){

    try {
      
      const response=await axios("https://api.cloudinary.com/v1_1/dj1wvmlcq/image/upload",{
      method:"POST",
      headers:{
        "Content-Type":"multipart/form-data"
      },
      data:
        Formdata
      
    })

    console.log(response.data);
    image=response.data.url;


    
    } catch (error) {
      console.log(error)
    }
  }

    try {
      console.log("image in PUT", image);
      const res=await axiosInstance("/users/editProfile", {
        method:"PUT", 
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data:{
          editedWebsite:editedWebsite||website,
              editedBio:editedBio||bio,
              userID:activeUser._id,
              editedImage:image
        }
    })
    console.log("editProf", res.data);
    setActiveUser(res.data);
    Navigate("/profile");
    window.location.reload();


    } catch (error) {
      console.log(error)
    }


    
    


   
  }

  return (
    <Container
      sx={{
        marginTop: "30px",
        width: { xs: "100%", sm: "65%" },
        minHeight: "500px",
        padding: "10px",
        border: "1px solid #D7D7D7",
        ml: { md: "auto", sm: "auto", xs: "0px" },
      }}
    >
      <Typography variant="body1" sx={{ p: "0 30px" }}>
        Edit Profile
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: "50px",
          p: "0 60px",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { md: "row", sm: "column", xs: "column" },
            gap: "20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar src={`${activeUser?.profilePic}`} />
          <Box>
            <Typography sx={{ fontSize: "15px" }}>
              {activeUser?.fullName}
            </Typography>
            <Box>
      {/* Hidden file input */}
      
       <input
          type="file"
          ref={fileInputRef}
          // value={selectedImage}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      
      
      

      {/* Text element acting as a button */}
      <Typography
        sx={{ fontSize: '12px', cursor: 'pointer' }}
        onClick={handleButtonClick}
      >
        Change profile photo
      </Typography>
    </Box>
          </Box>
          <Link to="/change-pass">
            {" "}
            <Typography sx={{ fontSize: "12px", color: "black" }}>
              Change Password
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "column", md: "row", xs: "column" },
            alignItems: { md: "center", sm: "flex-start", xs: "flex-start" },
            gap: { md: "85px", sm: "10px", xs: "10px" },
          }}
        >
          <Typography>Website</Typography>
          <Box>
            {
              (activeUser?.website||activeUser?.bio||activeUser?.profilePic)?(<Textfieldnew
                variant="filled"
                placeholder="Website"
                // value={website}
                defaultValue={website}
              
                onChange={(e) => setEditedWebsite(e.target.value)}
                
              />):(<Textfieldnew
                variant="filled"
                placeholder="Website"
                value={website}
              
                onChange={(e) => setWebsite(e.target.value)}
                
              />)
            }
            
            <Typography
              variant="inherit"
              sx={{
                fontSize: "13px",
                color: "gray",
                display: { xs: "none", sm: "block" },
              }}
            >
              Editing your links is only available on mobile. Visit the
              instagram app and edit your profiles to change the websites in the
              bio
            </Typography>
          </Box>
        </Box>

        {/* <Box sx={{display:"flex", flexDirection:{sm:"column", md:"row", xs:"column"}, alignItems:{md:"center", sm:"flex-start", xs:"flex-start"}, gap:{md:"75px", sm:"10px", xs:"10px"}}}>
    <Typography>FullName</Typography>
    <Box>
    <Textfieldnew
        
          variant="outlined"
        
        placeholder="FullName"
          
        />
        <Typography variant="inherit" sx={{fontSize:"13px"}}>0/10</Typography>
    </Box>
</Box> */}

        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "column", md: "row", xs: "column" },
            alignItems: { md: "center", sm: "flex-start", xs: "flex-start" },
            gap: "15%",
          }}
        >
          <Typography>Bio</Typography>
          <Box>
            {
              (activeUser?.website||activeUser?.bio||activeUser?.profilePic)?(<TextField
                variant="outlined"
                multiline={true}
                minRows="2"
                defaultValue={activeUser?.bio}
                // value={bio}
                onChange={(e) => setEditedBio(e.target.value)}
              />):(<TextField
                variant="outlined"
                multiline={true}
                minRows="2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />)
            }
            
            <Typography variant="inherit" sx={{ fontSize: "13px" }}>
              0/150
            </Typography>
          </Box>
          {/* <Toolbar/> */}
        </Box>
      </Box>
      <Toolbar />
     {
      (activeUser?.bio||activeUser?.website||activeUser?.profilePic)?
      (<Button
        variant="contained"
        sx={{
          textTransform: "none",
          fontSize: "12px",
          marginLeft: "50px",
          mb: "20px",
        }}
        onClick={editProfileHandler}
      >
        Submit
      </Button>):(<Button
        variant="contained"
        sx={{
          textTransform: "none",
          fontSize: "12px",
          marginLeft: "50px",
          mb: "20px",
        }}
        onClick={addProfileHandler}
      >
        Submit
      </Button>)
     } 
    </Container>
  );
};
