const mongoose=require ("mongoose");
const express=require("express");
const router=express.Router();
const Story=require("../models/storyModel");
const checkAuth = require("../middlewares/checkAuth");
const { route } = require("./postRoute");


router.post("/post-new-story", checkAuth ,async(req, res)=>{
    const{postArr, caption, userID}=req.body;
    // console.log("story", postArr, caption, userID);

    const storyPost=await Story.find({ storyPostedBy: userID });
    // console.log("storyPost", storyPost);

    const images = postArr.map((file) => {
    
        return ({
            mediaUrl: file.secure_url,
            
            type:file.resource_type
          
    })
});

console.log("final images", images);

    if(storyPost.length!==0){
        // console.log("hii storypost",storyPost[0]._id );
 await Story.findByIdAndUpdate(storyPost[0]._id,{$push:{media:{mediaUrl:postArr[0].secure_url, type:postArr[0].resource_type}}});
 return res.status(200).json({message:"Story updated"});
    }
    
    // console.log("hii out of storypost");
    await Story.create({mediaCaption:caption, storyPostedBy:userID, media:images});
    res.status(200).json({message:"Story updated"});
});


router.get("/getAllStory", async(req, res)=>{
    const AllStory=await Story.find().populate("storyPostedBy").sort({createdAt:-1});
    res.status(200).json(AllStory);
})

router.get("/getStory/:storyID", async(req, res)=>{
    console.log("storyID is", req.params.storyID);
    const getStory=await Story.findById(req.params.storyID).populate("storyPostedBy");
    res.status(200).json(getStory);
})

router.delete("/delete-story", async(req, res)=>{

    const{storyToBeDeleted, storyID}=req.body;
    console.log("delete story", storyToBeDeleted, storyID);
    const deleteImage=await Story.findByIdAndUpdate(storyID, {$pull:{media:{_id:storyToBeDeleted}}}, {new:true});
    // console.log(deleteStory.media.length);
    // console.log("deleteStory", deleteStory)
    if(deleteImage.media.length===0){
        await Story.findByIdAndDelete(storyID);
    //    const deletedStory=await deleteImage.remove();
    const allStory=await Story.find().populate("storyPostedBy").sort({createdAt:-1})
      return res.status(200).json(allStory);
    }

const StoryData=await Story.find().populate("storyPostedBy").sort({createdAt:-1});
    res.status(200).json(StoryData);

})

module.exports=router;
