const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
  senderID: {
    type: ObjectId,
    ref: "User",
    required: true,
  },

  receiverID: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  unRead:{
    type: Boolean
  }
  // timestamp: {
  //   type: Date,
  //   default: Date.now(),
  // },
},
{
  timestamps:true
});

module.exports=mongoose.model('Message', messageSchema);
