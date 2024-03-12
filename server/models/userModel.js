const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:"No photo"
    },
    username:{
        type:String,
        required:true
    }, 
    password:{
        type:String,
        required:true
    }, 
    bio:{
        type:String
    }, 
    website:{
        type:String
    }, 
    notification:[
        {
          senderName: { type:String },
          type: { type: Number, required: true },
        }
      ],
    
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    // saved:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],
    
})

module.exports=mongoose.model("User",userSchema );

