import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    type:{
        type:String
    },
    createdAt: { type: Date, default: Date.now }
})

const Notification = mongoose.model("Notifications",NotificationSchema)
export default Notification