const mongoose = require("mongoose");
const StorySchema = new mongoose.Schema({
  media: [
    { 
        mediaUrl: { 
            type: String
         },
         type: { 
            type: String 
        } 
    }
],
  mediaCaption: {
     type: String 
    },

storyPostedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }
},

{
    timestamps:true
});

module.exports=mongoose.model("Story", StorySchema);


