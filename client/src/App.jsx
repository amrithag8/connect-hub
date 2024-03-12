import { useState, useEffect, useRef, useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Profilepage } from "./Pages/Profilepage";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Loginpage } from "./Pages/Loginpage";
import { ChangePassword } from "./Pages/Changepassword";
import { ResetPassword } from "./Pages/Resetpassword";
import { Onetimepass } from "./Pages/Onetimepassword";
import { Homepage } from "./Pages/Homepage";
import { Appbar } from "./Components/Appbar";
import ProtectedRouteAfterLogged from "./ProtectedRouteAfterLogged";
import "./App.css";
import { Registerpage } from "./Pages/Registerpage";
import { Editprofilepage } from "./Pages/Editprofilepage";
import Createpost from "./Components/Createpost";
import Messages from "./Components/Messages";
import StoryPage from "./Pages/StoryPage";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import EmailVerifyPage from "./Pages/EmailVerifyPage";
import { axiosInstance } from "./utils/interceptor";
import { Editpost } from "./Components/Editpost";
import { ViewPost } from "./Components/ViewPost";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import io from "socket.io-client";
import UploadProgress from "./Components/UploadProgress";
import UserContext from "./Contexts/UserContext";
import { PostsContext } from "./Contexts/PostsContext";
import { MessageContext } from "./Contexts/MessageContext";
import StoryPosts from "./Components/StoryPosts.jsx";
import { StoryContext } from "./Contexts/StoryContext.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const socket = useRef();
  const {
    setSuggestions,
    activeUser,
    setActiveUser,

    setProfileUser,
  } = useContext(UserContext);

  const {
    setPosts,
    changePost,

    triggerViewpost,
    loaded,
    triggerPost,
    setTriggerPost,
  } = useContext(PostsContext);

  const {
    
    receivedmsg,
    setReceivedmsg,
    message,
    setMessage,
    unReadCount,
    setUnReadCount,
  } = useContext(MessageContext);

  const {triggerStory, setAllStory}=useContext(StoryContext);

  // const [messageOpen, setMessageOpen] = useState(false);

  // const [receivedmsg, setReceivedmsg] = useState([]);
  // const [message, setMessage] = useState("");
  const [notification, setNotification] = useState([]);
  // const [unreadMessage, setUnreadMessage] = useState([]);
  const [mode, setMode] = useState(false);

  // const [unReadCount, setUnReadCount] = useState(0);

  useEffect(() => {
    socket.current = io("https://connect-hub-19ki.onrender.com/");
    socket.current.on("receive_msg", (data) => {
      console.log("Received message data:", data);

      setReceivedmsg((prev) => {
        return [
          ...prev,
          {
            senderID: data.senderID,
            receiverID: data.receiverID,
            content: data.message,
            unRead: true,
          },
        ];
      });
      // setUnreadMessage((prev) => {
      //   return [
      //     ...prev,
      //     {
      //       senderID: data.senderID,
      //       receiverID: data.receiverID,
      //       content: data.message,
      //       unRead: true,
      //     },
      //   ];
      // });
      console.log("data", data.senderID, data.message);
    });

    socket.current.on("receiveNotification", ({ senderName, type }) => {
      console.log("received notification", senderName, type);

      setNotification((prev) => {
        return [...prev, { senderName, type }];
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("userID", { userID: activeUser?._id });
    socket.current.on("allUsers", (data) => {});
  }, [activeUser]);

  const getAllposts = async () => {
    const response = await axiosInstance("/posts/allposts");
    setPosts(response.data);
  };

  useEffect(() => {
    getAllposts();
  }, []);

const getAllStories=async()=>{
const response=await axiosInstance("/story/getAllStory");
setAllStory(response.data);
}

useEffect(() => {
  getAllStories();
}, []);

  useEffect(() => {
    if (localStorage.getItem("AccessToken")) {
      userDetails();
    }
  }, []);

  const userDetails = async () => {
    const response = await axiosInstance("/users/home");
    setActiveUser(response.data);
  };

  const sendMessage = async (otherUserID) => {
    console.log("message", message, otherUserID);
    setMessage("");
    socket.current.emit("send_msg", {
      message,
      senderID: activeUser?._id,
      receiverID: otherUserID,
    });

    try {
      const response = await axiosInstance("/messages/send-message", {
        method: "POST",
        data: {
          senderID: activeUser?._id,
          receiverID: otherUserID,
          content: message,
          unRead: true,
        },
      });

      setReceivedmsg(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
    // setMessage("");
  };
  console.log("activeUser", activeUser);
  // console.log("posts", posts);

  console.log("unReadCount", unReadCount);

  useEffect(() => {
    const getAllMessages = async () => {
      const response = await axiosInstance("/messages/getAllmessages/", {
        params: {
          sender: activeUser?._id,
        },
      });
      console.log("all chats", response.data);
      setUnReadCount(
        response.data.filter((item) => {
          return item.unRead === true;
        }).length
      );
    };

    getAllMessages();
  }, [activeUser, receivedmsg]);

  useEffect(() => {
    const AllUsers = async () => {
      const response = await axiosInstance("/users/all-users");
      console.log("hiiiiiibjsb", response.data);
      setSuggestions(response.data);
    };
    AllUsers();
  }, [activeUser]);

  return (
    <>
      <ThemeProvider theme={mode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Appbar mode={mode} setMode={setMode} setTriggerPost={setTriggerPost}/>

        {triggerPost && <Createpost />}
        {changePost && <Editpost />}
        {loaded > 0 && <UploadProgress loaded={loaded} />}
        {triggerViewpost && <ViewPost mode={mode}/>}
        {triggerStory&&<StoryPosts/>}

        <Routes>
          <Route element={<ProtectedRouteAfterLogged />}>
            <Route path="/register" element={<Registerpage />} />
            <Route path="/reset-pass" element={<ResetPassword />} />
            <Route path="/otp" element={<Onetimepass />} />
            <Route
              path="/login"
              element={<Loginpage setActiveUser={setActiveUser} />}
            />

            <Route path="/verify-email" element={<EmailVerifyPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/inbox"
              element={
                <Messages
                  sendMessage={sendMessage}
                  setTriggerPost={setTriggerPost}
                />
              }
            />
            <Route
              path="/inbox/:id"
              element={
                <Messages
                  sendMessage={sendMessage}
                  setTriggerPost={setTriggerPost}
                />
              }
            />
            <Route path="/change-pass" element={<ChangePassword />} />
            <Route path="/story/:storyID" element={<StoryPage />} />
            <Route path="/profile" element={<Profilepage mode={mode} setMode={setMode}/>} />
            <Route path="/profile/:id" element={<Profilepage mode={mode} setMode={setMode}/>} />
            <Route path="/edit-profile" element={<Editprofilepage mode={mode} setMode={setMode}/>} />

            <Route
              path="/"
              element={
                <Homepage
                  notification={notification}
                  setNotification={setNotification}
                  setMode={setMode}
                  mode={mode}
                />
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
