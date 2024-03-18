import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { axiosInstance } from "../utils/interceptor";
import { Box } from "@mui/material";

export default function StandardImageList({
  activeUser,
  savedPost,
  savedPostView,
  setViewpost,
  posts,
  profileUser,
  setTriggerViewpost,
}) {
  const viewPostHandler = async (postID) => {
    console.log("viewpost", postID);

    const response = await axiosInstance("/posts/viewpost", {
      method: "POST",
      data: { postID },
    });

    // console.log("viewPost", response.data);
    setViewpost(response.data);
    setTriggerViewpost(true);
  };

  // const myposts=posts.filter((item)=>{
  //   return(
  //     item?.postedBy?._id===activeUser?._id
  //   )
  // })

  // console.log("myposts", myposts)
  return (
    <>
      {/* <ImageList sx={{ width: "80%", minHeight: 400 }} cols={3} rowHeight={164}> */}
        <Box sx={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"2px",  height:"450px", alignItems:"center", justifyContent:"center",overflowY:"scroll",
'&::-webkit-scrollbar':{
  width:10,
 
},
'&::-webkit-scrollbar-track':{
  // backgroundColor:"red"
} ,
'&::-webkit-scrollbar-thumb':{
  backgroundColor:"gray",
  borderRadius:"5px"
  
  
} }}>
        {!savedPost
          ? posts.map((post) => {
              return profileUser
                ? post.postedBy._id == profileUser.profileUser._id && (
                    <ImageListItem
                      
                      onClick={() => viewPostHandler(post._id)}
                    >
                      {post.image[0].type === "image" ? (
                        <img
                          srcSet={`${post.image[0].imageUrl}`}
                          src={`${post?.image[0]?.imageUrl}`}
                          alt={post.title}
                          loading="lazy"
                          // style={{ width: '250px', height:'200px'}}
                          style={{ cursor: "pointer", maxwidth: '150px',width:"100%", height:'300px', objectFit:"cover" }}
                        />
                      ) : (
                        <video
                          style={{ pointerEvents: "none", cursor: "pointer" ,maxwidth: '150px',width:"100%", height:'300px', objectFit:"cover"}}
                          width="300"
                          height="300"
                          autoPlay
                          controls
                        >
                          <source
                            src={`${post?.image[0]?.imageUrl}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </ImageListItem>
                  )
                : post?.postedBy?._id == activeUser?._id && (
                    <ImageListItem
                      
                      onClick={() => viewPostHandler(post._id)}
                    >
                      {post.image[0].type === "image" ? (
                        <img
                          srcSet={`${post.image[0].imageUrl}`}
                          src={`${post?.image[0]?.imageUrl}`}
                          alt={post.title}
                          loading="lazy"
                          // style={{ width: '250px', height:'200px'}}
                          style={{ cursor: "pointer", maxwidth: '150px',width:"100%", height:'300px', objectFit:"cover" }}
                        />
                      ) : (
                        <video
                          style={{ pointerEvents: "none"  , cursor: "pointer", maxwidth: '150px',width:"100%", height:'300px', objectFit:"cover"}}
                          width="300"
                          height="300"
                          autoPlay
                          controls
                        >
                          <source
                            src={`${post?.image[0]?.imageUrl}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </ImageListItem>
                  );
            })
          : savedPostView?.map((post) => {
              return (
                <ImageListItem
                
                  onClick={() => viewPostHandler(post._id)}
                >
                  {post.image[0].type === "image" ? (
                    <img
                      srcSet={`http://localhost:3007/images/${post.image}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                      src={`${post?.image[0]?.imageUrl}`}
                      alt={post.title}
                      loading="lazy"
                      // style={{ width: '250px', height:'200px'}}
                      style={{ cursor: "pointer", maxwidth: '150px',width:"100%", height:'300px', objectFit:"cover" }}
                    />
                  ) : (
                    <video
                    style={{ pointerEvents: "none"  , cursor: "pointer", maxwidth: '150px',width:"100%", height:'300px', objectFit:"cover"}}
                      width="300"
                      // height="200"
                      autoPlay
                      controls
                    >
                      <source
                        src={`${post?.image[0]?.imageUrl}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </ImageListItem>
              );
            })}
            </Box>
      {/* </ImageList> */}
    </>
  );
}

// const itemData = [
//   {
//     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     title: "Breakfast",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//     title: "Burger",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//     title: "Hats",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//     title: "Honey",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//     title: "Basketball",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//     title: "Fern",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//     title: "Mushrooms",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//     title: "Tomato basil",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//     title: "Sea star",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//     title: "Bike",
//   },
// ];
