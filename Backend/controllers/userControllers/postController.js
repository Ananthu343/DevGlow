import PostRepository from "../../repositories/postRepository.js";
import { getTokenData } from "../../utils/jwtToken.js";
import { app } from "../../configs/firebase.js";
import {getDownloadURL, getStorage,ref,uploadBytes} from "firebase/storage"

const storage = getStorage(app)

const postRepository = new PostRepository()

export const postController = {
    uploadPost : async (req,res)=>{
        if(!req.file){
            res.status(500).send({error: 'no file found'})
        }
         try {
            const file = req.file
            const user = getTokenData(req)
            const filePath = `uploads/${file.originalname}`
            const storageRef = ref(storage,filePath)
            await uploadBytes(storageRef,file.buffer)
            const fileUrl = await getDownloadURL(storageRef)
            const newPost = {
                creatorId: user,
                description: req.body.description,
                visibility: req.body.visibility,
                media: fileUrl
            }
            await postRepository.save(newPost)
            res.status(200).send('Post submitted successfully')
         } catch (error) {
            console.log(error.message);
            res.status(401).send({error: 'Error submitting post'});
         }
    }
}