import Post from "../models/postDb.js";

class PostRepository{
    async save(post){
        const newPost = new Post(post)
        return await newPost.save()
    }
}

export default PostRepository