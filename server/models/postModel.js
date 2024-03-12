const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  caption: {
    type: String,
    
  },
  image: [
    {
      imageUrl: {
        type: String,
        required: true,
      },

      type:{
        type: String,
        required:true,
      }
      // You can include additional fields related to each image if needed
    },
  ],
  comments:[{
   text: {type:String},
   commentedBy:{type:ObjectId, ref:"User"} 
  }],
  likes:[{type:ObjectId, ref:"User"}],
  saved:[{type:ObjectId, ref:"User"}],
  postedBy: { type: ObjectId, ref: "User" },
}, 
{
    timestamps:true
});

module.exports=mongoose.model("Post", postSchema);