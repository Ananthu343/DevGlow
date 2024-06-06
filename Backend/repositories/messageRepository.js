import Message from "../models/messageDb.js";

class MessageRepository{
    async save(message){
        const newMessage = new Message(message)
        return await newMessage.save()
    }
    async findById(id) {
        return await Message.findById(id);
    }
    async getHistory(id1,id2){
        return await Message.find({sender:{$in:[id1,id2]},receiver:{$in:[id1,id2]}}).sort({createdAt:1})
    }
    async getCommunityHistory(id){
        return await Message.find({communityId:id}).sort({createdAt:1})
    }
    async deleteMessagesCommunity(id){
        return await Message.deleteMany({communityId:id})
    }
    async getUnread(id){
        return await Message.find({receiver:id,readStatus:false})  
    }
    async markRead(sender,receiver){
        return await Message.updateMany({receiver:receiver,sender:sender},{$set:{readStatus:true}})
    }
    async getMessageGraphData() {
        return await Message.find({ communityId: { $exists: false } }, { createdAt: 1 });
    }
    async getCommunityGraphData(){
        return await Message.find({ communityId: { $exists: true } }, { createdAt: 1 });
    }
}

export default MessageRepository