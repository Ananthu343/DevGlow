import Post from "../models/postDb.js";

class PostRepository{
    async save(post){
        const newPost = new Post(post)
        return await newPost.save()
    }
    async getFeed(){
        return await Post.find()
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
}

export default PostRepository