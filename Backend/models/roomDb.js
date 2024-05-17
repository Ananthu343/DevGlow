import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  createdAt: { type: Date, default: Date.now } 
});

const Room = mongoose.model("Rooms",RoomSchema);

export default Room