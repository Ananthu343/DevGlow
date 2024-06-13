import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  communityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Community'
  },
  createdAt: { type: Date, default: Date.now }
});

const Room = mongoose.model("Rooms", RoomSchema);

export default Room