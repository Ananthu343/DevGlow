import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  name: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }],
  description: {
    type: String
  },
  profile_url: {
    type: String
  },
  privacy: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  },
  reports: {
    type: Number,
    default: 0
  },
  user_limit: {
    type: Number,
    default: 0
  },
  createdAt: { type: Date, default: Date.now }
});

const Community = mongoose.model("Community", CommunitySchema);

export default Community