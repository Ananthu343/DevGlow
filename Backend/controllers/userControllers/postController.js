import PostRepository from "../../repositories/postRepository.js";
import { getTokenData } from "../../utils/jwtToken.js";

const postRepository = new PostRepository()

export const postController = {
    uploadPost : async (req,res)=>{
        console.log("works",req.body);
        console.log(req.file);
         try {
            const user = getTokenData(req)
            const newPost = {
                creatorId: user,
                description: req.body.description,
                visibility: req.body.visibility,
                media: req.file.id
            }
            await postRepository.save(newPost)
            res.status(200).send('Post submitted successfully')
         } catch (error) {
            console.log(error.message);
            res.status(401).send({error: 'Error submitting post'});
         }
    }
}