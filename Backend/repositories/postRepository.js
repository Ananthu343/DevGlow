import Post from "../models/postDb.js";

class PostRepository{
    async save(post){
        const newPost = new Post(post)
        return await newPost.save()
    }
    async getFeed(pageSize, offset) {
        return await Post.find().skip(offset).limit(pageSize).sort({createdAt: -1});
    }
    async getUserPosts(id){
        return await Post.find({creatorId:id})
    }
    async getSavedPosts(savedPostsIds){
        return Post.find({ _id: { $in: savedPostsIds } })
    }
    async getTotalPostsCount(){
        return await Post.countDocuments()
    }
    async deletePost(id) {
        return await Post.deleteOne({ _id: id });
    }
    async updatePost(id, update) {
        return await Post.findOneAndUpdate(
           { _id: id }, 
           update, 
           { new: true } 
        );
    }
    async findById(id) {
        return await Post.findById(id);
    }
    async pullLikedUsers(postId,myId) {
        return await Post.findOneAndUpdate(
            { _id: postId }, 
            { $pull: { likedUsers : myId } }, 
            { new: true }
        );
    }
    async pushLikedUsers(postId,myId) {
        return await Post.findOneAndUpdate(
            { _id: postId }, 
            { $addToSet: { likedUsers : myId } }, 
            { new: true }
        );
    }
}

export default PostRepository