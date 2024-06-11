import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    creatorId :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    description:{
        type:String
    },
    visibility:{
        type:String,
        default:"Public"
    },
    media:{
        type:String,
    },
    stars:{
        type:Number,
        default: 0
    },
    likedUsers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    reports:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    archive:{
        type:Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now } 
})

const Post = mongoose.model("Posts",PostSchema);

export default Post