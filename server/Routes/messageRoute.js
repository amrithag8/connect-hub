const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();
const Message=require("../models/messageModel");
const checkAuth=require("../middlewares/checkAuth");
const users=require("../models/userModel");

router.post("/send-message", async(req, res)=>{
const{senderID, receiverID, content, unRead}=req.body;
// console.log("unRead", unRead);
if(!content){
    return res.status(400).json({message:"Not a valid message"});
}

await Message.create({senderID,receiverID, content, unRead });
const Allmessages=await Message.find({
    $or: [
      { senderID: senderID, receiverID: receiverID },
      { senderID: receiverID, receiverID: senderID }
    ]
  }).sort({createdAt:1});


  
  res.status(200).json(Allmessages);
})



router.put("/allmessages", async(req, res)=>{
    const{senderID, receiverID}=req.body;

await Message.updateMany({
  
    // { senderID: senderID, receiverID: receiverID, unRead: true },
     senderID: receiverID, receiverID: senderID, unRead: true 
  
}, 
{ $set: { unRead: false } });


    
    const Allmessages=await Message.find({
        $or: [
          { senderID: senderID, receiverID: receiverID },
          { senderID: receiverID, receiverID: senderID }
        ]
      }).populate('receiverID').sort({createdAt:1});

      // console.log(Allmessages);

      
      res.status(200).json(Allmessages);

})

router.delete("/delete-messages", async(req, res)=>{
    const{receiverID, senderID}=req.body;

    await Message.deleteMany({
        $or: [
          { senderID: senderID, receiverID: receiverID },
          { senderID: receiverID, receiverID: senderID }
        ]
      });

      const AllMessages=await Message.find({
        $or: [
          { senderID: senderID, receiverID: receiverID },
          { senderID: receiverID, receiverID: senderID }
        ]
      }).populate('receiverID').sort({createdAt:1})
      res.status(200).json(AllMessages);
      

})

router.get("/", checkAuth, async(req, res)=>{
    const{sender}=req.query;
    console.log("sender456", sender);
    
    const Id=new mongoose.Types.ObjectId(sender);
    
try {

    const recentChats=await Message.aggregate([
        {
            $match: {
              $or: [{ senderID: Id }, { receiverID: Id }],
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          
          {
            $group: {
              _id: {
                $cond: [{ $eq: ["$senderID", Id] }, "$receiverID", "$senderID"],
              },
              latestMessage: { $first: "$$ROOT" },
            },
          },
          {
            $replaceRoot: { newRoot: "$latestMessage" },
          },
          {
                  $lookup: {
                    from: "users",
                    localField: "senderID",
                    foreignField: "_id",
                    as: "senderInfo",
                  },
                },
                {
                  $lookup: {
                    from: "users",
                    localField: "receiverID",
                    foreignField: "_id",
                    as: "receiverInfo",
                  },
                },
            
                {
                  $unwind: "$senderInfo",
                },
                {
                  $unwind: "$receiverInfo",
                },
                {
                  $project: {
                    _id: 1,
                    content: 1,
                    createdAt: 1,
                    senderInfo: 1,
                    receiverInfo: 1,
                    unRead:1
                    
                  },
                },
                {
                    $sort: { createdAt: -1 },
                  },

          

        ]);


       
    res.status(200).json(recentChats);
    
    // console.log("recentChats", recentChats);

    
} catch (error) {
    console.log("Error fetching recent chats:", error);   
}
    
})


router.get("/getAllmessages", checkAuth, async(req, res)=>{
  const{sender}=req.query;
  // console.log("sender123", sender);
  const chats=await Message.find({receiverID: sender
 })
  // console.log("chats", chats);
  res.status(200).json(chats);
})



module.exports=router;
