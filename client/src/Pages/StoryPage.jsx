import { Box, Typography } from "@mui/material";
import React, {useContext, useEffect, useRef, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../utils/interceptor";
import { StoryContext } from "../Contexts/StoryContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';


// import {useHistory} from "react-router";

let imagesArr = [
  {
    id: 1,
    url: "https://media.istockphoto.com/id/183412466/photo/eastern-bluebirds-male-and-female.jpg?s=612x612&w=0&k=20&c=6_EQHnGedwdjM9QTUF2c1ce7cC3XtlxvMPpU5HAouhc=",
  },
  {
    id: 2,
    url: "https://st5.depositphotos.com/35914836/64906/i/450/depositphotos_649066108-stock-photo-pink-flowers-park-spring-bloosom.jpg",
  },
  {
    id: 3,
    url: "https://cdn.pixabay.com/photo/2016/02/10/21/57/heart-1192662_640.jpg",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1496692052106-d37cb66ab80c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZyZWV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 5,
    url: "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    url: "https://media.istockphoto.com/id/148423909/photo/a-sunset-over-chinese-fishing-nets-by-a-canoe-in-cochin.jpg?s=612x612&w=0&k=20&c=76RtSZhX5iheTAyDuH6Uzl9JNWD5axbWlEWc2bXKChw=",
  },
  {
    id: 7,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5PkW4fJsvhTn3s9hnv2nSU7a5jkGYsUH9Zl7YOHZKeA&s",
  },
  {
    id: 8,
    url: "https://media.istockphoto.com/id/1225173869/photo/house-boat-anchored-in-lake-with-jungle-background-backwaters-kerala-india.jpg?s=612x612&w=0&k=20&c=uo-bsRQjhlT9AgeWBs_pkSvHQwStCelMC75EUpzwjHU=",
  },
  {
    id: 9,
    url: "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 10,
    url: "https://images.pexels.com/photos/919278/pexels-photo-919278.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  // {
  //   id:11,
  //   url:"https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=600"
  // },
  // {
  //   id:12,
  //   url:"https://images.pexels.com/photos/1485548/pexels-photo-1485548.jpeg?auto=compress&cs=tinysrgb&w=600"
  // },
  // {
  //   id:13,
  //   url:"https://images.pexels.com/photos/265987/pexels-photo-265987.jpeg?auto=compress&cs=tinysrgb&w=600"
  // },
  // {
  //   id:14,
  //   url:"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600"
  // },
  // {
  //   id:15,
  //   url:"https://images.pexels.com/photos/1545590/pexels-photo-1545590.jpeg?auto=compress&cs=tinysrgb&w=600"
  // }
];

function StoryPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setisMenuOpen]=useState(false);
  const menuRef=useRef();
  
  const Navigate = useNavigate();

 const{ selectedStory, setSelectedStory, setAllStory}=useContext(StoryContext);

  const{storyID}=useParams();
  console.log("params story id is", storyID);
 

  const getStory=async()=>{
const res=await axiosInstance(`/story/getstory/${storyID}`);
console.log(res.data);
setSelectedStory(res.data);
  }

  useEffect(()=>{
    getStory();
  },[]);
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("currentImageIndex", currentImageIndex);
      if (currentImageIndex < selectedStory?.media.length - 1) {
        setCurrentImageIndex((prevIndex) => prevIndex + 1);
      } else {
        Navigate("/");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentImageIndex, Navigate, selectedStory?.media?.length]);

  useEffect(()=>{
    const handleClickOutside=(event)=>{

      if(!menuRef.current.contains(event.target)){
        setisMenuOpen(false);
      }
    };
    if(isMenuOpen){
      document.addEventListener("mousedown", handleClickOutside);
    }
    else{
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return(()=>{
      document.removeEventListener("mousedown", handleClickOutside);
    })
    
  },[isMenuOpen]);


  const handleStoryDelete=async(storyID, storyToBeDeletedID)=>{
console.log("storyToBeDeletedID", storyToBeDeletedID);
const response=await axiosInstance("/story/delete-story",{
  method:"DELETE",
  data:{
    storyID, 
    storyToBeDeleted:storyToBeDeletedID
  }
})
console.log(response.data);
// setSelectedStory(response.data);
setAllStory(response.data);
Navigate(-1);
  }
 
  return (
    <Box
      sx={{ bgcolor: "black", width: "100%", height: "100vh", p: "30px 35%" }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
        {
      (selectedStory?.length!=0)&&(
        selectedStory?.media[currentImageIndex]?.type==='image')?
      (<img
        src={selectedStory?.media[currentImageIndex]?.mediaUrl}
        style={{
          width: "400px",
          position: "relative",
          objectFit: "cover",
          height: "90vh",
        }}
      />):(<video
        style={{ pointerEvents: "none" }}
        width="400"
        height="700"
        
        autoPlay
        controls
      >
        <source
          src={selectedStory?.media[currentImageIndex]?.mediaUrl}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>)
    }

{isMenuOpen && (
        <div ref={menuRef} style={{ position: 'absolute', top: 10, right: 0, background: 'white', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' , zIndex:"100"}}>
          <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
            <li style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }} onClick={()=>handleStoryDelete(selectedStory._id,selectedStory?.media[currentImageIndex]?._id)}>Delete</li>
           
          </ul>
        </div>
      )}
       <div style={{ position: 'absolute', top: 10, right: 0, padding: '10px', cursor: 'pointer' }} onClick={()=>setisMenuOpen(true)}>
      <MoreVertIcon sx={{position:"absolute", zIndex:"99", top:"8%", right:"40%", cursor:"pointer"}}/>
      </div>

      </div>

      <Box
        sx={{
          display: "flex",
          gap: "3px",
          position: "absolute",
          top: "40px",
          justifyContent: "center",
          padding: "0px 5px",
          alignItems:"center"
        }}
      >
        {selectedStory?.media?.map((item, index) => {
          return (
            <Box
              sx={{
                width: `${Math.floor(400 / selectedStory?.media.length - 5)}px`,
                height: "2px",
                backgroundColor:
                  index === currentImageIndex ? "white" : "#D3D3D3",
              }}
            ></Box>
          );
        })}

        {/* <Box
          sx={{ width: "75px", height: "2px", backgroundColor: "#D3D3D3" }}
        ></Box>
        <Box
          sx={{ width: "75px", height: "2px", backgroundColor: "#D3D3D3" }}
        ></Box>
        <Box
          sx={{ width: "75px", height: "2px", backgroundColor: "#D3D3D3" }}
        ></Box>
        <Box
          sx={{ width: "75px", height: "2px", backgroundColor: "#D3D3D3" }}
        ></Box>
        <Box
          sx={{ width: "75px", height: "2px", backgroundColor: "#D3D3D3" }}
        ></Box> */}
      </Box>
      
    </Box>
  );
}

export default StoryPage;
