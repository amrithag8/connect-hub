const mongoose=require("mongoose");
const express=require("express");
const router=express.Router();
const Post=require("../models/postModel");
const User=require("../models/userModel");
const checkAuth=require("../middlewares/checkAuth");
const multer=require("multer");



// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//         const folder = file.mimetype.startsWith('image/') ? 'images' : 'videos';
//       cb(null, `public/${folder}`);
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       const extension = file.originalname.split(".").pop();
//       cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
//     },
//   });
  
//   const upload = multer({ storage: storage });
  



router.post("/createpost",  checkAuth, async(req, res)=>{
const {title, caption, postArr}=req.body;
console.log("post", postArr, title, caption);

// if(title===""||title==="null"||caption===""||caption==="null"){

    

   
//     return res.status(400).json({message:"Title and caption is mandatory"});
// }

const images = postArr.map((file, index) => {
    
        return ({
            imageUrl: file.secure_url,
            //Add other properties as needed based on your schema
            type:file.resource_type
          
    })
    
  });
  console.log("final images", images);

await Post.create({title, caption, image:images, postedBy:req.body.userID});
res.status(200).json({message:"Posted"});
})

router.get("/allposts", async(req, res)=>{
    const Allposts=await Post.find().populate("postedBy").sort({createdAt:-1});
    res.status(200).json(Allposts);
})

router.get("/postspage", async(req, res)=>{
    const page = req.query.page  // Get the requested page from the query parameter
    console.log("page is postspageRoute", page);
    const perPage = 6; // Number of posts per page
    const skip = (page - 1) * perPage;
    const postspage = await Post.find().skip(skip).limit(perPage).populate("postedBy").sort({createdAt:-1});
    res.status(200).json(postspage);


})


router.post("/likedpost", checkAuth, async(req, res)=>{
    const {userID, postID}=req.body;
    await Post.findByIdAndUpdate(postID, {$push:{likes:userID}});
    const likedPosts=await Post.find().populate("postedBy").sort({createdAt:-1});
    return res.status(200).json(likedPosts);
})

router.post("/unlikepost", checkAuth, async(req, res)=>{
    const {userID, postID}=req.body;
    await Post.findByIdAndUpdate(postID, {$pull:{likes:userID}});
    const likedPosts=await Post.find().populate("postedBy").sort({createdAt:-1});
    return res.status(200).json(likedPosts);
})


router.put("/savedpost", checkAuth, async(req, res)=>{
    const{postID, userID}=req.body;
    // console.log(postID, userID, "savedpost");
    // if(savedpost){
        await Post.findByIdAndUpdate(postID, {$push:{saved:userID}}, {new:true});
        const userDetails=await Post.find().populate("postedBy").sort({createdAt:-1});
        // console.log("userDetails", userDetails);
        return res.status(200).json(userDetails);
    // }

    

})

router.put("/unsavepost",checkAuth,  async(req, res)=>{
    const{postID, userID}=req.body;
    // console.log(postID, userID, "unsavepost");
    await Post.findByIdAndUpdate(postID, {$pull:{saved:userID}}, {new:true});
    const userDetails=await Post.find().populate("postedBy").sort({createdAt:-1});
    // console.log("unsaved", userDetails);
    return res.status(200).json(userDetails);
})

router.get("/viewpost/:userID", async(req, res)=>{
    const{userID}=req.params;
    console.log("userID", userID);
    const Posts=await Post.find();

    const savedPosts=Posts.filter((item)=>{
if(item.saved.indexOf(userID) !== -1){
    return item;
} 
else{
    return null;
}
    })
    

    
    // console.log("userDetail", savedPosts);
    res.status(200).json(savedPosts);
    })

router.delete("/deletepost", checkAuth, async(req, res)=>{
    const {userID, postID}=req.body;
    console.log("delete",postID);
    await Post.findByIdAndUpdate(postID, {$pull:{likes:userID}});
    await User.findByIdAndUpdate(userID, {$pull:{saved:postID}});
    await Post.findByIdAndDelete(postID);
    const allPosts=await Post.find().populate("postedBy").sort({createdAt:-1});
    return res.status(200).json(allPosts);
})

router.put("/editposts", checkAuth, async(req, res)=>{
    const{editedTitle, editedCaption, postID}=req.body;
    // console.log("edit", editedTitle, editedCaption, postID);
    await Post.findByIdAndUpdate(postID, {title:editedTitle, caption:editedCaption});
    const editedPost=await Post.find().populate("postedBy").sort({createdAt:-1});
    return res.status(200).json(editedPost);
})

router.post("/viewpost", checkAuth, async(req, res)=>{
    const{postID}=req.body;
    const postDetails=await Post.findById(postID).populate("postedBy").sort({createdAt:-1});
    // console.log("postDetails", postDetails);
    res.status(200).json(postDetails);
})

router.put("/create-comment", checkAuth, async(req, res)=>{
    const{text, commentedBy, postID}=req.body;
    console.log("comment", text, commentedBy, postID);
    await Post.findByIdAndUpdate(postID, {$push:{comments:
        {text, commentedBy}}});

        const updated=await Post.findById(postID).populate("postedBy").populate({path: 'comments.commentedBy',
        model: 'User'});
        // console.log("updated", updated);
        res.status(200).json(updated);
})

router.get("/get-allcomments", async(req, res)=>{
    const{postID}=req.query;
    const comments=await Post.findById(postID).populate("postedBy").populate({path: 'comments.commentedBy',
    model: 'User'});
    // console.log("postID is", comments);
    res.status(200).json(comments);
})


router.put("/delete-comment", async(req, res)=>{
    const{commentID, postID}=req.body;
    console.log("comments deleted");
    const deletedComments=await Post.findByIdAndUpdate(postID, {$pull:{comments:{_id:commentID}}}, {new:true}).populate("postedBy").populate({path: 'comments.commentedBy',
    model: 'User'});
    
    res.status(200).json(deletedComments);

    
})
module.exports=router;




