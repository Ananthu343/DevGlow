import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  content: String,
  createdAt: { type: Date, default: Date.now } 
});

const Message = mongoose.model("Messages",MessageSchema);

export default Message