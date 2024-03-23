const express=require("express");
// const cloudinary = require('cloudinary').v2;
const http = require('http');
const { Server } = require('socket.io');
const cors=require("cors");
const User=require("./models/userModel");



// cloudinary.config({ 
//     cloud_name: 'dj1wvmlcq', 
//     api_key: '826524421174459', 
//     api_secret: 'Flhty2oyCSVXYM2gKVv1ucRo_wI' 
//   });
require('dotenv').config();


const connectDb=require("./config/db");
const app=express();
const path = require('path');
app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methords: ["GET", "POST"],
    },
  });

  const corsOptions = {
    // origin: 'https://master--connect-hub-client.netlify.app',
    // Add other CORS options as needed
    origin:'http://localhost:5173',
  };

//   app.use(cors({ origin: "https://connect-hub-client.onrender.com", credentials: true }));


// app.use(cors({ origin: "http://localhost:5173/", credentials: true }));
app.use(cors(corsOptions));
  connectDb();
const userRoute=require("./Routes/userRoute");
const postRoute=require("./Routes/postRoute");
const messageRoute=require("./Routes/messageRoute");
const StoryRoute=require("./Routes/storyRoute");
const jwt = require("jsonwebtoken");





app.use(express.json());
app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.sendFile(__dirname, 'index.html');
//   });


app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/api/story", StoryRoute);
let users = [];
let unreadCount=0;

const addUsers=(userID, socketID)=>{
!users.some((user)=>user.userID=== userID)&&
users.push({userID, socketID});
}

const removeUser=(socketID)=>{
users=users.filter((user)=>{
    return (user.socketID!==socketID)
})
}

const getUser=(receiverID)=>{
return users.find(user=>user.userID===receiverID);
}

io.on('connection', (socket) => {
    
    // console.log('User connected: ' + socket.id);

   

    socket.on("send_msg", (data)=>{
        const{message, receiverID, senderID}=data;

        console.log("message", message,receiverID );
        const receiver=getUser(receiverID);
       
        io.to(receiver?.socketID).emit("receive_msg", {senderID, receiverID, message});
       
    })

    socket.on("userID", (data)=>{
        console.log("userid", data.userID);
        const{userID}=data;
        addUsers(userID, socket.id);
        io.emit("allUsers", users);
    })

    socket.on("sendNotification", ({type, senderID, receiverID, senderName})=>{
        try {
            
            const receiver=getUser(receiverID);
        console.log("receiver", receiver, senderID, type,senderName );
        // io.to(receiver?.socketID).emit("receiveNotification",{
        //     senderID, type  
        // });
        if (receiver && receiver.socketID) {
            io.to(receiver.socketID).emit("receiveNotification", {senderName,type });
          } else {
            console.log("Receiver not found or missing socketID");
          }
        } catch (error) {
            console.log("error", error);
        }
    })

    socket.on("disconnect",()=>{
        console.log("a user disconnected");
        removeUser(socket.id);
        io.emit("allUsers", users);
    })

    

})




const PORT=3007;
server.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));