import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../utils/interceptor";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import EmojiPicker from "emoji-picker-react";
import UserContext from "../Contexts/UserContext";
import { PostsContext } from "../Contexts/PostsContext";

export const ViewPost = ({mode}) => {
  // const [editedTitle, setEditedTitle] = useState();
  // const [editedCaption, setEditedCaption] = useState();
  const [activeIndex, setActiveIndex] = useState(0);
  const{viewpost, setTriggerViewpost}=useContext(PostsContext);
  const [newcomment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [emojiOepn, setEmojiOpen] = useState(false);
  const emojiRef = useRef(null);
  const{activeUser}=useContext(UserContext)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiOpen(false);
      }
    };

    // Add event listener when EmojiPicker is open
    if (emojiOepn) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when EmojiPicker is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiOepn]);

  useEffect(() => {
    AllComments();
  }, []);

  const AllComments = async () => {
    console.log("hiii");
    const response = await axiosInstance("/posts/get-allcomments", {
      params: {
        postID: viewpost._id,
      },
    });
    console.log("all comments", response.data.comments);
    setComments(response.data.comments);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % viewpost?.image?.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? viewpost?.image?.length - 1 : prevIndex - 1
    );
  };

  //     const editpostHandler=async(postID, title, caption)=>{
  // const response=await axiosInstance("/posts/editposts", {
  //     method:"PUT",
  //     data:{
  //         editedTitle:editedTitle||title,
  //         editedCaption:editedCaption||caption, postID
  //     }
  // })

  // setChangePost(false);
  // setPosts(response.data);
  //     }

  const emojiHandler = (event, emojiObject) => {
    // console.log("t is", emojiObject);
    // console.log("event", event);
    // setEmojiIcon(event);
    const cursorPosition =
      document.getElementById("messageInput").selectionStart;
    const newMessage =
      newcomment.substring(0, cursorPosition) +
      event.emoji +
      newcomment.substring(cursorPosition);
    setNewComment(newMessage);
  };

  const postCommentHandler = async (postID) => {
    setNewComment("");
    const response = await axiosInstance("posts/create-comment", {
      method: "PUT",
      data: {
        text: newcomment,
        commentedBy: activeUser._id,
        postID,
      },
    });
    console.log("comments", response.data);
    setComments(response.data.comments);
  };

  const deleteCommentsHandler = async (commentID) => {
    const response = await axiosInstance("/posts/delete-comment", {
      method: "PUT",
      data: {
        commentID,
        postID: viewpost._id,
      },
    });
    console.log("deleted", response.data.comments);
    setComments(response.data.comments);
  };
  console.log("viewpost", viewpost);
  return (
    <Container
      maxWidth="xl"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0,0,0,0.4)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CloseIcon
        sx={{
          position: "absolute",
          top: "5%",
          right: "5%",
          cursor: "pointer",
          color: "white",
          fontSize: "35px",
          fontWeight: 800,
        }}
        onClick={() => setTriggerViewpost(false)}
      />
      {/* <Box sx={{position:"absolute", top:"10%", right:80, cursor:"pointer", color:"white", fontSize:"28px"}}>X</Box> */}

      <Container
        sx={{
          width: { sm: "70%", xs: "100%" },
          height: "600px",
          bgcolor: "white",
          borderRadius: "10px",
          display: "flex",
          mt: { sm: "7%", xs: "50%" },
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "auto",
          position: "relative",
        }}
      >
        {/* <Container sx={{width:{sm:"30%", xs:"100%"}, height:"500px", display:"flex", gap:"20px",mt:{sm:"10%", xs:"50%"},flexDirection:"column", alignItems:"center"}}> */}

        {/* <Box component="img" src={`http://localhost:3007/images/${viewpost.image}`} sx={{width:{md:"600px", sm:"200px", xs:"100px"}, height:{md:"550px", sm:"200px", xs:"100px"}}}></Box> */}
        {/* <img style={{width:{sm:"400px", xs:"150px"}, height:{sm:"450px", xs:"150px"}}} src={imagePreview}/> </> */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <ArrowBackIosIcon sx={{ cursor: "pointer" }} onClick={handlePrev} />
          {viewpost.image[activeIndex].type === "image" ? (
            <img
              style={{ maxWidth: "350px", width: "100%", height: "350px" }}
              src={`${viewpost.image[activeIndex].imageUrl}`}
            />
          ) : (
            <video
              style={{ pointerEvents: "none" }}
              width="350"
              height="350"
              autoPlay
              controls
            >
              <source
                src={`${viewpost.image[activeIndex].imageUrl}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}

          <ArrowForwardIosIcon
            sx={{ cursor: "pointer" }}
            onClick={handleNext}
          />
        </Box>

        <Divider orientation="vertical" sx={{ ml: "20px" }} />

        <Container
          sx={{
            width: { sm: "60%", xs: "100%" },
            height: "550px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Avatar
              sx={{ width: "40px", height: "40px" }}
              src={`${viewpost?.postedBy?.profilePic}`}
            />
            <Typography sx={{ fontWeight: "600" }}>
              {viewpost.postedBy.username}
            </Typography>
          </Box>

          <Divider
            orientation="horizontal"
            sx={{ mt: "10px", width: "100%" }}
          />
<Box sx={{overflow:"auto"}}>
  {/* <Box sx={{pb:"40px"}}> */}
          {viewpost.caption && (
            <Box sx={{ display: "flex", gap: "10px", mt: "10px" }}>
              <Avatar
                sx={{ width: "40px", height: "40px" }}
                src={`${viewpost?.postedBy?.profilePic}`}
              />
              <Typography sx={{ fontWeight: "600" }}>
                {viewpost.postedBy.username}
              </Typography>
              <Typography>{viewpost.caption}</Typography>
            </Box>
          )}
          {/* <Divider orientation='horizontal' sx={{mt:"95%", width:"100%"}}/> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: "10px",
              alignItems: "flex-start",
            }}
          >
            {comments.map((item) => {
              return (
                <Box
                  key={item._id}
                  sx={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {item.commentedBy.fullName}:
                  </Typography>
                  <Typography>{item.text}</Typography>

                  {item.commentedBy._id === activeUser._id && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: "bold",
                        cursor: "pointer",
                        zIndex: emojiOepn ? "" : 50,
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                      onClick={() => deleteCommentsHandler(item._id)}
                    >
                      Delete
                    </Typography>
                  )}
                </Box>
              );
            })}
            </Box>
          </Box>
          {/* </Box> */}
          <Box sx={{pt:"40px"}}>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
              alignItems: "center",
              
            }}
          >
            <Box
              ref={emojiRef}
              sx={{
                position: "absolute",
                bottom: "120px",
                width: 400,
                height: 400,
              }}
            >
              <EmojiPicker
                open={emojiOepn}
                autoFocusSearch
                onEmojiClick={emojiHandler}
              />
            </Box>
            <Box sx={{ cursor: "pointer" }} onClick={() => setEmojiOpen(true)}>
              😊
            </Box>
            <TextField
              id="messageInput"
              label="Add comment"
              variant="outlined"
              value={newcomment}
              sx={{
                width: { sm: "100%", xs: "100%" },
                border: "none",
                "& fieldset": { border: "none" },
                
              }}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => postCommentHandler(viewpost._id)}
            >
              Post
            </Typography>
          </Box>
          </Box>
          {/* <Button variant='contained' sx={{textTransform:"none", marginTop:"20px"}} onClick={()=>editpostHandler(editedPost.postID, editedPost.title, editedPost.caption )}>Post</Button> */}
        </Container>

        {/* </Container> */}
      </Container>
    </Container>
  );
};
