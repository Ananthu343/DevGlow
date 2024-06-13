import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    },
    content: {
        type: String
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    likes: {
        type: Number,
        default: 0
    },
    createdAt: { type: Date, default: Date.now }
})

const Comment = mongoose.model("Comments", CommentSchema);

export default Comment