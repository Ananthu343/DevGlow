import CommunityRepository from "../../repositories/communityRepository.js";
import { getTokenData } from "../../utils/jwtToken.js";
import { app } from "../../configs/firebase.js";
import {getDownloadURL, getStorage,ref,uploadBytes,deleteObject} from "firebase/storage"

const communityRepository = new CommunityRepository()
const storage = getStorage(app)


export const communityController = {
    createCommunity : async(req,res)=>{
        try {
            let fileUrl = undefined; 
            
            if (req.file) {
                const file = req.file;
                const filePath = `uploads/${file.originalname}`;
                const storageRef = ref(storage, filePath);
                await uploadBytes(storageRef, file.buffer);
                fileUrl = await getDownloadURL(storageRef);
            }
            if (!req.body.name) {
                return res.status(401).send({ error: 'Error creating community' });
            }
            const user = getTokenData(req);
            let newCommunity = {
                creatorId: user,
                name:req.body.name,
                description: req.body.description,
                privacy: req.body.privacy,
                user_limit:req.body.userLimit,
                profile_url: fileUrl 
            };
    
            newCommunity = await communityRepository.save(newCommunity);
            res.status(200).send({newCommunity});
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    }
}