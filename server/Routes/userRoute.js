const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const User=require("../models/userModel");
const {generateHashPassword}=require("../utils/bcrypt");
const {verifyHashedPassword}=require("../utils/bcrypt");
const {generateToken}=require("../utils/jwt");
const checkAuth=require("../middlewares/checkAuth");
const SendEmail=require("../utils/SendEmail");
const multer=require("multer");
let otp="";
let usermail;


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/ProfileImages");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split(".").pop();
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
  });
  
  const upload = multer({ storage: storage });

router.post("/register", async(req, res)=>{
    const{email, fullName, username, password}=req.body;
    if(!email || !fullName || !username || !password){
return res.status(401).json({message:"All fields are required"});
    }
    const isExistEmail=await User.findOne({email:email});
    if(isExistEmail){
return res.status(401).json({message:"Email already exists"});
    }
    
    const isExistUsername=await User.findOne({username});
    if(isExistUsername){
        return res.status(401).json({message:"Username already exists"});  
    }

    const HashPassword=await generateHashPassword(password);
    await User.create({email, fullName, username, password:HashPassword});
    const Users=await User.find();

    console.log("value", email, fullName, username, password, HashPassword);
    // console.log(Users);
    res.status(200).json({message:"Sign Up successful"} );
})


router.post("/login", async(req, res)=>{
const {loginUsername,loginPass}=req.body;
let verifyPass;
let comparePass;
let AccessToken;
const isExistUsername=await User.findOne({username:loginUsername});
const isExistEmail=await User.findOne({email:loginUsername});
if(!isExistUsername&&!isExistEmail){


    return res.status(401).json({message:"Username invalid"});

}
if(isExistUsername){
    verifyPass=await verifyHashedPassword(loginPass, isExistUsername.password);
}

else {
    comparePass=await verifyHashedPassword(loginPass, isExistEmail.password); 
}

if(verifyPass){
    AccessToken=generateToken(isExistUsername._id);
    // console.log("token", AccessToken);
    return res.status(200).json({id:isExistUsername._id, username:isExistUsername.username, fullName:isExistUsername.fullName, followers:isExistUsername.followers, following:isExistUsername.following, AccessToken});
    
}
else if(comparePass){
    AccessToken=generateToken(isExistEmail._id);
    // console.log("tokeb", AccessToken);
    return res.status(200).json({id:isExistEmail._id, username:isExistEmail.username, fullName:isExistEmail.fullName, followers:isExistEmail.followers, following:isExistEmail.following, AccessToken});
}

else{
    return res.status(401).json({message:"Password invalid"});

}



})


router.post("/change-pass",checkAuth, async(req, res)=>{
    const{currentPass, newPass}=req.body;
// console.log(req.body.userID);
const loggedUser=await User.findById(req.body.userID);
// console.log(loggedUser);
const passValid=await verifyHashedPassword(currentPass, loggedUser.password)
if(passValid){
    const HashedPass=await generateHashPassword(newPass);
    await User.findByIdAndUpdate(req.body.userID, {password:HashedPass});
    return res.status(200).json({message:"Password changed succesfully"});
}
 res.status(400).json({message:"Current password invalid. Please try again"});

})


router.post("/verify-email", async(req, res)=>{
    otp="";
    const{userEmail}=req.body;
    const validEmail=await User.findOne({email:userEmail});
    const validUsername=await User.findOne({username:userEmail});
    if(!validEmail&&!validUsername){
      return res.status(400).json({message:"Invalid Email/Username"});
    }
     usermail=validEmail?userEmail:validUsername.email;
    
  for(let i=0; i<6; i++){
    otp=otp+Math.floor(Math.random()*10);
  }
    console.log("success");
    
    SendEmail(usermail, otp);
    return res.status(200).json({message:"Success"});
})

router.post("/otp", async(req, res)=>{
    const{otpNumber}=req.body;
    
    if(otp==otpNumber){
        return res.status(200).json("success");
    }
   return res.status(400).json({message:"Invalid OTP"});
})

router.post("/reset-pass", async(req, res)=>{
    otp="";
    const{newResetPass}=req.body;
    const currentUser=await User.findOne({email:usermail});
    if(!currentUser){
        return res.status(400).json({message:"Valid email not found for the user. Please try again later"});

    }
    const newPass=await generateHashPassword(newResetPass);
    await User.findByIdAndUpdate(currentUser._id, {password:newPass});
    return res.status(200).json("Password updated successfully");
    // console.log("otp", usermail);
})

router.get("/home", checkAuth, async(req, res)=>{
    const{userID}=req.body;
    const userProf=await User.findById(userID).populate("following followers").select('id:_id username fullName profilePic notification followers following saved bio website');
// console.log("userProfhome", userProf);
res.status(200).json(userProf);
})



    



router.post("/search-users", checkAuth, async(req, res)=>{
    const {searchuser}=req.body;
   
    const users=await User.find();
   let searchedResult= users.filter((item)=>{
       if( item.username.includes(searchuser)){
        return item;
       }
       return null;
       
    })
    // console.log("search",searchedResult );
    res.status(200).json(searchedResult);
})

router.post("/profile/:id", checkAuth, async(req, res)=>{
const {id}=req.params;
const{userID}=req.body;

const profileUser=await User.findById(id).select('_id username fullName profilePic followers following saved bio website');

const responseData = {
    userID, 
    profileUser
};
res.status(200).json(responseData);
})

router.put("/following", checkAuth, async(req, res)=>{
    const{id}=req.body;
    // console.log("id", id);
    // console.log("userID", req.body.userID);
    const followingUpdate= await User.findByIdAndUpdate(req.body.userID, {$push:{following:id}}, {new:true}).populate("following");
    // console.log(followingUpdate);
    const following={_id:followingUpdate._id, username:followingUpdate.username, profilePic:followingUpdate.profilePic, fullName:followingUpdate.fullName, notification:followingUpdate.notification, followers:followingUpdate.followers, following:followingUpdate.following, saved:followingUpdate.saved, bio:followingUpdate.bio, website:followingUpdate.website};
    // res.status(200).json(followingUpdate);
    const followersUpdate= await User.findByIdAndUpdate(id, {$push:{followers:req.body.userID}}, {new:true}).populate("followers");
const followers={_id:followersUpdate._id,username:followersUpdate.username, profilePic:followersUpdate.profilePic, fullName:followersUpdate.fullName, notification:followersUpdate.notification, followers:followersUpdate.followers, following:followersUpdate.following, saved:followersUpdate.saved, bio:followersUpdate.bio, website:followersUpdate.website};
const follow={following,followers };
// console.log("followersUpdate",follow );
res.status(200).json(follow);

})

router.put("/unfollow", checkAuth, async(req, res)=>{
    const{id}=req.body;
    // console.log("id", id);
    // console.log("userID", req.body.userID);
    const followingUpdate= await User.findByIdAndUpdate(req.body.userID, {$pull:{following:id}}, {new:true}).populate("following");
    // console.log(followingUpdate);
    const following={_id:followingUpdate._id, username:followingUpdate.username, notification:followingUpdate.notification, profilePic:followingUpdate.profilePic, fullName:followingUpdate.fullName, followers:followingUpdate.followers, following:followingUpdate.following, saved:followingUpdate.saved, bio:followingUpdate.bio, website:followingUpdate.website};
    // res.status(200).json(followingUpdate);
    const followersUpdate= await User.findByIdAndUpdate(id, {$pull:{followers:req.body.userID}}, {new:true}).populate("followers");
const followers={_id:followersUpdate._id, username:followersUpdate.username, notification:followersUpdate.notification, profilePic:followersUpdate.profilePic, fullName:followersUpdate.fullName, followers:followersUpdate.followers, following:followersUpdate.following, saved:followersUpdate.saved, bio:followersUpdate.bio, website:followersUpdate.website};
const follow={following,followers };
// console.log("followersUpdate",follow );
res.status(200).json(follow);

})

router.post("/notification", async(req, res)=>{
    const {receiverID, type, senderName}=req.body;
    console.log("notification",receiverID, type, senderName );
   const notificationUpdate= await User.findByIdAndUpdate(receiverID, {$push:{notification:{senderName,type} }}, {new:true});
//    console.log(notificationUpdate.notification);
   return res.status(200).json({ notification:notificationUpdate.notification});
})



router.post("/editProfile", upload.single("prof_img"), async(req, res)=>{
    const{website, bio, userID, image}=req.body;
    console.log("website", website, bio, userID, image);
    // console.log("formdata img", req.file);
    if((image==null)||(image=="")){
        const userProfile=await User.findByIdAndUpdate(userID, {website, bio}).select('_id username fullName profilePic followers following saved bio website')
         return res.status(200).json(userProfile);
    }
    const userProfile=await User.findByIdAndUpdate(userID, {website, bio,  profilePic:image}).select('_id username fullName profilePic followers following saved bio website')
    return res.status(200).json(userProfile);
   
})

router.put("/editProfile", upload.single("edit_Profpic"), async(req, res)=>{
    const{editedWebsite, editedBio, userID, editedImage}=req.body;
    console.log("editedWebsite", editedWebsite,editedBio, userID, editedImage );
    // console.log("img", req.file.filename);
    if((editedImage==null)||(editedImage=="")){
        const userProfile=await User.findByIdAndUpdate(userID, {website:editedWebsite, bio:editedBio }).select('_id username fullName profilePic followers following saved bio website')
        return res.status(200).json(userProfile);
    }
    
    const userProfile=await User.findByIdAndUpdate(userID, {website:editedWebsite, bio:editedBio ,profilePic:editedImage}).select('_id username fullName profilePic followers following saved bio website')
        return res.status(200).json(userProfile);
     
})

router.get("/all-users", checkAuth, async(req, res)=>{
    const{userID}=req.body;
const Users=await User.find();

const AllUsers=Users.filter((item)=> item._id!=userID);

const newArr=[];
const numbers=[1, 2, 3, 4, 5, 6, 7];
for(let i=0; i<=numbers[Math.floor(Math.random()*numbers.length)]; i++){
    
    newArr.push(AllUsers[Math.floor(Math.random()*AllUsers.length)]);
}

res.status(200).json(newArr);
});





module.exports=router;