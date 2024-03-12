import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  ListItemIcon,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import StandardImageList from "./ImageList";
import GradientIcon from "@mui/icons-material/Gradient";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../utils/interceptor";
import io from "socket.io-client";
import UserContext from "../Contexts/UserContext";
import { PostsContext } from "../Contexts/PostsContext";

export const Profile = () => {
  // const [profileUsername, setProfileUsername]=useState();
  // const[userID, setUserID]=useState();
  // const [following, setFollowing]=useState([]);
  // const [followers, setFollowers]=useState([]);
  const [savedPost, setSavedPost] = useState(false);
  const [savedPostView, setSavedPostView] = useState([]);
  const {activeUser, setActiveUser, profileUser,setProfileUser }=useContext(UserContext);
  const {setTriggerViewpost, setViewpost, posts}=useContext(PostsContext);

  const socket = useRef();
  const { id } = useParams();
  

  useEffect(() => {
    socket.current = io("http://localhost:3007");
  }, []);
  console.log("profileUser", profileUser);
  const userProfile = async () => {
    console.log("id params", id);
    const response = await axiosInstance(`/users/profile/${id}`, {
      method: "POST",
      data: {
        id,
      },
    });
    console.log("user", response.data);
    setProfileUser(response.data);
  };
  useEffect(() => {
    if (id) {
      userProfile();
    }
  }, [id]);

  const postCountOfThisUser = posts.filter((item) => {
    if (item?.postedBy?._id === activeUser?._id) {
      return item;
    }
    return null;
  });

  const postCountOfOtherUser = posts.filter((item) => {
    if (item.postedBy._id === profileUser?.profileUser?._id) {
      return item;
    }
    return null;
  });

  const followHandler = async (id, userID, username, type) => {
    // console.log("id are", id);
    // console.log("self id", userID);

    try {
      const response = await axiosInstance("/users/following", {
        method: "PUT",
        data: {
          id,
        },
      });

      //
      setProfileUser({ profileUser: response.data.followers });
      setActiveUser(response.data.following);

      socket.current.emit("sendNotification", {
        senderID: userID,
        senderName: username,
        receiverID: id,
        type,
      });
    } catch (error) {
      console.log(error);
    }

    
  };

  const unfollowHandler = async (id, userID) => {
    const response = await axiosInstance("/users/unfollow", {
      method: "PUT",
      data: {
        id,
      },
    });
    //
    setProfileUser({ profileUser: response.data.followers });
    setActiveUser(response.data.following);
  };

  const savedPostHandler = async () => {
    const response = await axiosInstance(`/posts/viewpost/${activeUser._id}`);
    console.log("savePOstview",response.data);
    setSavedPostView(response.data);
    setSavedPost(true);
  };

  return (
    <Container
      sx={{
        width: { sm: "75%", xs: "100%" },
        height: "100vh",
        paddingTop: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: "10%",
          alignItems: { md: "center", sm: "flex-start" },
          ml: { lg: "10%", md: "0px" },
          padding: { lg: "0 20px", md: "0 50px", xs: "0 5px" },
        }}
      >
        {profileUser ? (
          <Avatar
            sx={{
              width: { md: "150px", sm: "100px", xs: "80px" },
              height: { md: "150px", sm: "100px", xs: "80px" },
            }}
            src={`${profileUser?.profileUser?.profilePic}`}
          />
        ) : (
          <Avatar
            sx={{
              width: { md: "150px", sm: "100px", xs: "80px" },
              height: { md: "150px", sm: "100px", xs: "80px" },
            }}
            src={`${activeUser?.profilePic}`}
          />
        )}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { sm: "column", md: "row", xs: "column" },
              alignItems: { md: "center", sm: "flex-start", xs: "flex-start" },
              gap: "5px",
            }}
          >
            {profileUser ? (
              <Typography variant="body1">
                {profileUser?.profileUser?.username}
              </Typography>
            ) : (
              <Typography variant="body1">{activeUser?.username}</Typography>
            )}

            <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
              {profileUser?.userID !== id ? (
                activeUser?.following.some((item) => item._id === id) ? (
                  <>
                    <Button
                      sx={{ textTransform: "none", fontSize: "12px" }}
                      variant="contained"
                      size="small"
                      onClick={() => unfollowHandler(id, profileUser?.userID)}
                    >
                      Unfollow
                    </Button>
                    <Button
                      sx={{ textTransform: "none", fontSize: "12px" }}
                      variant="contained"
                      size="small"
                    >
                      Message
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      sx={{ textTransform: "none", fontSize: "12px" }}
                      variant="contained"
                      size="small"
                      onClick={() =>
                        followHandler(
                          id,
                          profileUser?.userID,
                          activeUser.username,
                          2
                        )
                      }
                    >
                      Follow
                    </Button>
                    <Button
                      sx={{ textTransform: "none", fontSize: "12px" }}
                      variant="contained"
                      size="small"
                    >
                      Message
                    </Button>
                  </>
                )
              ) : (
                // indexOf(id)!==-1)?

                <>
                  <Link to="/edit-profile">
                    <Button
                      sx={{ textTransform: "none", fontSize: "12px" }}
                      variant="contained"
                      size="small"
                    >
                      Edit Profile
                    </Button>
                  </Link>
                  <Button
                    sx={{ textTransform: "none", fontSize: "12px" }}
                    variant="contained"
                    size="small"
                  >
                    View Archive
                  </Button>
                  <Settings />
                </>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {profileUser ? (
              <>
                <Typography variant="body2" sx={{ fontSize: "13px" }}>
                  {postCountOfOtherUser.length} Posts
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ ml: "10px", fontSize: "13px" }}
                >
                  {profileUser?.profileUser?.followers?.length} Followers
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ ml: "10px", fontSize: "13px" }}
                >
                  {profileUser?.profileUser?.following?.length} Following
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body2" sx={{ fontSize: "13px" }}>
                  {postCountOfThisUser.length} Posts
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ ml: "10px", fontSize: "13px" }}
                >
                  {activeUser?.followers.length} Followers
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ ml: "10px", fontSize: "13px" }}
                >
                  {activeUser?.following.length} Following
                </Typography>
              </>
            )}
          </Box>
          <Box>
            {profileUser ? (
              <>
                <Typography component="h6">
                  {profileUser?.profileUser?.fullName}
                </Typography>
                <Typography variant="body2">
                  {profileUser?.profileUser?.bio}
                </Typography>
              </>
            ) : (
              <>
                <Typography component="h6">{activeUser?.fullName}</Typography>
                <Typography variant="body2">{activeUser?.bio}</Typography>
              </>
            )}

            {/* <Typography variant="body2">Front end & Game Developer</Typography> */}
          </Box>
        </Box>
      </Box>
      <Toolbar />
      <Divider width="80%" />
      <Stack
        width="80%"
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <GradientIcon
          fontSize="small"
          sx={{ cursor: "pointer" }}
          onClick={() => setSavedPost(false)}
        />
        <Typography
          variant="body2"
          sx={{ cursor: "pointer" }}
          onClick={() => setSavedPost(false)}
        >
          POSTS
        </Typography>

        <Toolbar />
        {/* <OndemandVideoIcon fontSize="small"/>
    <Typography variant="body2">REELS</Typography>
    <Toolbar/> */}
        {!profileUser && (
          <>
            <BookmarkIcon
              fontSize="small"
              sx={{ cursor: "pointer" }}
              onClick={savedPostHandler}
            />
            <Typography
              variant="body2"
              onClick={savedPostHandler}
              sx={{ cursor: "pointer" }}
            >
              SAVED
            </Typography>
          </>
        )}
      </Stack>
      <StandardImageList
        savedPost={savedPost}
        savedPostView={savedPostView}
        setViewpost={setViewpost}
        posts={posts}
        activeUser={activeUser}
        profileUser={profileUser}
        setTriggerViewpost={setTriggerViewpost}
      />
    </Container>
  );
};
