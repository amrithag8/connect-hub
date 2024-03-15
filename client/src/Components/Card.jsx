import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Story } from "./Story";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { AccountsMenu } from "./Menu";
import io from "socket.io-client";
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import ArrowCircleRightTwoToneIcon from '@mui/icons-material/ArrowCircleRightTwoTone';




import { useContext, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../utils/interceptor";
import PostComponent from "./PostComponent";
import UserContext from "../Contexts/UserContext";
import { PostsContext } from "../Contexts/PostsContext";
export const Newposts = ({
  
  
 
  setNotification,
  
  items,
  
  setItems
}) => {
  const {setPosts,setChangePost, setEditedPost, loaded}=useContext(PostsContext);
  const {activeUser, setActiveUser}=useContext(UserContext);
  const [expanded, setExpanded] = useState(false);
  const [posteditoptions, setPosteditoptions] = useState(null);
  // const [savedpost, setSavedpost] = useState(false);
  // const [UserDetails, setUserDetails] = useState([]);
  
  const socket = useRef();

  // console.log("posts items", items);

  


  const editPosts = Boolean(posteditoptions);

  // console.log("all posts", posts);
  // console.log("activeUser", activeUser);

  useEffect(() => {
    
    socket.current = io("http://localhost:3007");
    

    

  }, []);

  console.log(loaded);

 
  


  const showLessHandler = () => {
    setExpanded(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlepostClose = () => {
    // alert("hi"+open+"hi"+editPosts);
    setPosteditoptions(null);
  };

  const clickmoreHandler = (e, id) => {
    if (e.currentTarget) {
      console.log("current tar",e.currentTarget.nextElementSibling );
      setPosteditoptions(id);
    } else {
      setPosteditoptions(null);
    }
  };

  const savebuttonHandler = async (e, postID) => {
    // alert("save"+ postID);
    if (e.target.checked) {
      // setSavedpost(true);
      // localStorage.setItem(`savedpost_${postID}`, 'true');
      const response = await axiosInstance("/posts/savedpost", {
        method: "PUT",
        data: {
          postID,
        },
      });
      setPosts(response?.data);
      setItems(response?.data);
      // setUserDetails(response?.data);
    } else {
      // setSavedpost(false);
      // localStorage.removeItem(`savedpost_${postID}`);

      const response = await axiosInstance("/posts/unsavepost", {
        method: "PUT",
        data: {
          postID,
        },
      });
      // console.log(response?.data);
      // setUserDetails(response?.data);
      setPosts(response?.data);
      setItems(response?.data);
    }

    // alert("checjed"+postID);
  };

  const likesHandler = async (e, postID, receiverID, type) => {
    if (e.target.checked) {
      // localStorage.setItem(`likedpost_${postID}`, "true");
      
      const response = await axiosInstance("/posts/likedpost", {
        method: "POST",
        data: { postID },
      });

      setPosts(response?.data);
      setItems(response?.data);
      

      const res=await axiosInstance("/users/notification",{
        method:"POST",
        data:{
          receiverID, type, senderName: activeUser.username
        }
      })
setNotification(res.data.notification);
setActiveUser((prevActiveUser) => ({
  ...prevActiveUser,
  notification: [...prevActiveUser.notification, res.data.notification],
}));

      socket.current.emit("sendNotification", {
        senderID:activeUser?._id,
        senderName:activeUser.username,
        receiverID,
        type
      })


    } else {
      // localStorage.removeItem(`likedpost_${postID}`);

      const response = await axiosInstance("/posts/unlikepost", {
        method: "POST",
        data: { postID },
      });

      setPosts(response?.data);
      setItems(response?.data);
    }


  };

  const deletepostHandler = async (postID) => {
    try {
      const response = await axiosInstance("/posts/deletepost", {
        method: "DELETE",
        data: {
          postID,
        },
      });
      setPosts(response.data);
      setItems(response?.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const editpostHandler = (postID, title, caption, image) => {
    setChangePost(true);
    setEditedPost({ postID, title, caption, image });
  };

  return (
    <Box
      sx={{
        width: { lg: "55%", sm: "75%", xs: "100%" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
        
      }}
    >
      <AccountsMenu
        setPosteditoptions={setPosteditoptions}
        posteditoptions={posteditoptions}
        
      />

      <Story />

      {/* <Typography variant="h1" sx={{zIndex:99}}>{loaded}</Typography> */}

      {items?.map((item, index) => {
        return (
          <Card
            sx={{
              marginTop: { xs: "20px", sm: "20px" },
              width: { sm: "75%", xs: "80%" },
             position:"relative"
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{width: "40px", height:"40px"}} src={`${item?.postedBy?.profilePic}`}/>
                
              }
              action={
                <IconButton aria-label="settings">
                  {activeUser?.username === item.postedBy?.username && (
                    <>
                      <MoreVertIcon onClick={(e) => clickmoreHandler(e, item._id)} />

                      {posteditoptions===item._id && (
                        <Box sx={{ width: 300 , position:"absolute", top:"-10px", zIndex:50, backgroundColor:"white", color:"black"}}>
                          <MenuItem
                            onClick={() =>
                              editpostHandler(
                                item._id,
                                item.title,
                                item.caption,
                                item.image
                              )
                            }
                          >
                            Edit
                          </MenuItem>
                          <MenuItem onClick={() => deletepostHandler(item._id)}>
                            Delete
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={handlepostClose}>Cancel</MenuItem>
                        </Box>
                      )}
                    </>
                  )}
                </IconButton>
              }
              title={item.postedBy.fullName}
            />


<PostComponent item={item}/>
      {/* {
        ((item.image.length===1) ?
        
         (<CardMedia
           component="img"
           height="400"
           image={`http://localhost:3007/images/${item?.image[0]?.imageUrl}`}
           alt="Paella dish"
         />):(<CardMedia
          component="video"
          height="400"
          image={`http://localhost:3007/videos/${item?.image[0]?.imageUrl}`}
          alt="Paella dish"
          autoPlay
          controls
        />))
       
             
      } */}
            <CardActions disableSpacing>
              
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                  onChange={(e) => likesHandler(e, item._id, item.postedBy._id, 1)}
                  checked={
                    item.likes.indexOf(activeUser?._id) !== -1 ? true : false
                  }
                />
              
              <Checkbox
                icon={<BookmarkBorderIcon />}
                checkedIcon={<BookmarkIcon sx={{ color: "gray" }} />}
                onChange={(e) => savebuttonHandler(e, item._id)}
                checked={
                  item.saved.indexOf(activeUser?._id) !== -1 ? true : false
                }
              />

              <IconButton aria-label="share">
                <SendOutlinedIcon />
              </IconButton>
            </CardActions>

            <CardContent>
              {item?.likes.length !== 0 && `${item?.likes?.length} likes`}
              <Typography variant="body2" color="text.secondary">
                {item.caption}
                {/* {!expanded && (
                  <span style={{ cursor: "pointer" }} onClick={handleExpandClick}>
                    <h4>More...</h4>
                  </span>
                )} */}
                {/* <CardContent> */}
                {/* {expanded && (
                  <span>
                    <span variant="body2" color="text.secondary">
                      Method: Heat 1/2 cup of the broth in a pot until simmering,
                      add saffron and set aside for 10 minutes. Heat oil in a (14-
                      to 16-inch) paella pan or a large, deep skillet over
                      medium-high heat. Add chicken, shrimp and chorizo, and cook,
                      stirring occasionally until lightly browned, 6 to 8 minutes.
                      Transfer shrimp to a large plate and set aside, leaving
                      chicken and chorizo in the pan. Add pimentón, bay leaves,
                      garlic, tomatoes, onion, salt and pepper, and cook, stirring
                      often until thickened and fragrant, about 10 minutes.
                    </span>
                    <span style={{ cursor: "pointer" }} onClick={showLessHandler}>
                      <h4>...Hide</h4>
                    </span>
                  </span>
                )} */}
              </Typography>
            </CardContent>
          </Card>
          
        );
      })}
       <Typography variant="h4">Loading...</Typography>
    </Box>
  );
};
