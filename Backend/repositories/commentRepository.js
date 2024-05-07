import Comment from "../models/commentDb.js"

class CommentRepository{
    async save(comment){
        const newComment = new Comment(comment)
        return await newComment.save()
    }
    async pushReplies(commentId,newCommentId) {
        return await Comment.findOneAndUpdate(
            { _id: commentId }, 
            { $push: { replies : newCommentId } }, 
            { new: true }
        );
    }
    async updateComment(id, update) {
        return await Comment.findOneAndUpdate(
           { _id: id }, 
           update, 
           { new: true } 
        );
    }
    async deleteComment(id) {
         await Comment.deleteOne({ _id: id });
         await Comment.updateMany({},{ $pull: { replies: id } })
         return
    }
    async getPostComments(){
        return await Comment.find()
    }
}

export default CommentRepository