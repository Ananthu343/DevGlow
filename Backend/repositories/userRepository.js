import User from "../models/userdb.js";

class UserRepository{
    async save(user){
       const newUser = new User(user)
       return await newUser.save()
    }
    async findAllUser(){
        return await User.find().select("-password")
    }
    async findById(id) {
        return await User.findById(id).select("-password").select("-token");
    }
    async findByEmail(email) {
        return await User.findOne({email});
    }
    async updateUser(id, update) {
        return await User.findOneAndUpdate(
           { _id: id }, 
           update, 
           { new: true } 
        ).select("-password").select("-token");
    }
    async pushIntoSavedArray(id, postId) {
        return await User.findOneAndUpdate(
            { _id: id }, 
            { $addToSet: { savedPosts: postId } }, 
            { new: true }
        );
    }

    async pullFromFollowing(id, userId) {
        return await User.findOneAndUpdate(
            { _id: id }, 
            { $pull: { following : userId } }, 
            { new: true }
        );
    }

    async pullFromFollowers(userId, myId) {
        return await User.findOneAndUpdate(
            { _id: userId }, 
            { $pull: { followers : myId } }, 
            { new: true }
        );
    }
    async pushIntoFollowing(id, userId) {
        return await User.findOneAndUpdate(
            { _id: id }, 
            { $addToSet: { following : userId } }, 
            { new: true }
        );
    }

    async pushIntoFollowers(userId, myId) {
        return await User.findOneAndUpdate(
            { _id: userId }, 
            { $addToSet: { followers : myId } }, 
            { new: true }
        );
    }

    async reportUser(userId) {
        return await User.findOneAndUpdate(
            { _id: userId }, 
            { $inc: { reportCount: 1 } }, 
            { new: true }
        );
    }
    
    async deleteUser(id) {
        return await User.deleteOne({ _id: id });
    }
}

export default UserRepository