import PostRepository from "../../repositories/postRepository.js";
import UserRepository from "../../repositories/userRepository.js";
import { getTokenData } from "../../utils/jwtToken.js";
import { app } from "../../configs/firebase.js";
import {getDownloadURL, getStorage,ref,uploadBytes,deleteObject} from "firebase/storage"

const storage = getStorage(app)

const postRepository = new PostRepository()
const userRepository = new UserRepository()

export const postController = {
    getFeed:async (req,res)=>{
        try {
            const feedData = await postRepository.getFeed()
            res.status(200).json(feedData)
        } catch (error) {
            res.status(500).send({error: 'internal server error'})
            console.log(error.message);
        }
    },
    getusers:async (req,res)=>{
        try {
            const userData = await userRepository.findAllUser()
            res.status(200).json(userData)
        } catch (error) {
            res.status(500).send({error: 'internal server error'})
            console.log(error.message);
        }
    }
    ,
    uploadPost: async (req, res) => {
        try {
            let fileUrl = undefined; 
            
            if (req.file) {
                const file = req.file;
                const filePath = `uploads/${file.originalname}`;
                const storageRef = ref(storage, filePath);
                await uploadBytes(storageRef, file.buffer);
                fileUrl = await getDownloadURL(storageRef);
            }
            if (fileUrl == undefined && !req.body.description) {
                return res.status(401).send({ error: 'Error submitting post' });
            }
            const user = getTokenData(req);
            const newPost = {
                creatorId: user,
                description: req.body.description,
                visibility: req.body.visibility,
                media: fileUrl 
            };
    
            await postRepository.save(newPost);
            res.status(200).send('Post submitted successfully');
        } catch (error) {
            console.log(error.message);
            res.status(401).send({ error: 'Error submitting post' });
        }
    },
    editPost: async(req,res)=>{
        try {
            const postId = req.body.id
            const post = await postRepository.findById(postId)
            let fileUrl = undefined;
            if (req.file) {
                const file = req.file;
                const filePath = `uploads/${file.originalname}`;
                const storageRef = ref(storage, filePath);
                await uploadBytes(storageRef, file.buffer);
                fileUrl = await getDownloadURL(storageRef);
            }
            let updatedPost ;
            if(fileUrl == undefined || fileUrl === post.media){
                updatedPost = {
                    description: req.body.description,
                    visibility: req.body.visibility,
                }
            }else{
                updatedPost = {
                    description: req.body.description,
                    visibility: req.body.visibility,
                    media:fileUrl
                }
            }
    
            await postRepository.updatePost(postId,updatedPost);
            res.status(200).send('Post updated successfully');
        } catch (error) {
            console.log(error.message);
            res.status(401).send({ error: 'Error updating post' });
        }
    },
    deletePost: async(req,res) => {
        try {
            const postId = req.query.id
            const postData = await postRepository.findById(postId)
            const mediaUrl = postData.media
            if (mediaUrl) {
                const mediaRef = ref(storage, mediaUrl);
                await deleteObject(mediaRef);
            }
            await postRepository.deletePost(postId)
            res.status(200).send('Post deleted successfully');
        } catch (error) {
            res.status(401).send({ error: 'Error deleting post' });
        }
    },
    savePost: async(req,res)=>{
        try {
            const postId = req.body.id
            const user = getTokenData(req)
            await userRepository.pushIntoSavedArray(user,postId)
            res.status(200).send('Post saved successfully');
        } catch (error) {
            res.status(401).send({ error: 'Error saving post' });
        }
    },
    likePost: async (req, res) => {
        try {
            const myId = getTokenData(req); // Assuming getTokenData returns an object with an id property
            const postId = req.body.id;
            const postData = await postRepository.findById(postId);
            
            let updatedLikeStatus = false;
            if (postData.likedUsers.includes(myId)) {
                console.log("unliked");
                await postRepository.pullLikedUsers(postId, myId);
                updatedLikeStatus = false; 
            } else {
                console.log("liked");
                // Like logic
                await postRepository.pushLikedUsers(postId, myId);
                updatedLikeStatus = true; 
            }
    
            // Fetch the updated post data to include in the response
            const updatedPostData = await postRepository.findById(postId);
    
            res.status(200).send({
                message: updatedLikeStatus ? 'Post liked successfully' : 'Post unliked successfully',
                likeStatus: updatedLikeStatus,
                updatedPost: updatedPostData // Include the updated post data in the response
            });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error', likeStatus: false });
            console.log(error.message);
        }
    }
    
}