import UserRepository from "../../repositories/userRepository.js";
import { getTokenData } from "../../utils/jwtToken.js";
import { app } from "../../configs/firebase.js";
import {getDownloadURL, getStorage,ref,uploadBytes,deleteObject} from "firebase/storage"

const storage = getStorage(app)

const userRepository = new UserRepository()

export const profileController = {
    getUserData: async(req,res)=>{
        try {
            const userId = req.query.id
            const userData = await userRepository.findById(userId)
            res.status(200).json(userData)
        } catch (error) {
            res.status(401).send({ error: 'Error getting user' });
            console.log(error.message);
        }
    },
    reportUser: async(req,res)=>{
        try {
            const userId = req.body.id;
            await userRepository.reportUser(userId)
            res.status(200).send('user reported successfully');
        } catch (error) {
            res.status(401).send({ error: 'Error reporting user' });
            console.log(error.message);
        }
    },
    followUser: async (req, res) => {
        try {
            const myId = getTokenData(req); 
            const newUserId = req.body.id;
            const myData = await userRepository.findById(myId);
    
            let updatedFollowStatus = false;

            if (myData.following?.includes(newUserId)) {
                // Unfollow logic
                await userRepository.pullFromFollowing(myId, newUserId);
                console.log("unfollowed");
                await userRepository.pullFromFollowers(newUserId, myId);
                updatedFollowStatus = false; // User is now unfollowed
            } else {
                console.log("followed");
                // Follow logic
                await userRepository.pushIntoFollowing(myId, newUserId);
                await userRepository.pushIntoFollowers(newUserId, myId);
                updatedFollowStatus = true; // User is now followed
            }
            const updatedUser = await userRepository.findById(newUserId)
            res.status(200).send({ message: updatedFollowStatus ? 'User followed successfully' 
            : 'User unfollowed successfully', followStatus: updatedFollowStatus,updatedUser });
        } catch (error) {
            res.status(500).send({ error: 'Error following user', followStatus: false });
            console.log(error.message);
        }
    },
    editProfile: async(req,res)=>{
        try {
            const userId = getTokenData(req)
            const user = await userRepository.findById(userId)
            let fileUrl = undefined;
            if (req.file) {
                const file = req.file;
                const filePath = `uploads/${file.originalname}`;
                const storageRef = ref(storage, filePath);
                await uploadBytes(storageRef, file.buffer);
                fileUrl = await getDownloadURL(storageRef);
            }
            let updatedProfile ;
            if(fileUrl == undefined || fileUrl === user.profile_url){
                updatedProfile = {
                    username: req.body.username,
                    about: req.body.about,
                    gender: req.body.gender,
                    dob: req.body.dob,
                }
            }else{
                updatedProfile = {
                    username: req.body.username,
                    about: req.body.about,
                    gender: req.body.gender,
                    dob: req.body.dob,
                    profile_url:fileUrl
                }
            }
    
            const updatedData = await userRepository.updateUser(userId,updatedProfile);
            res.status(200).json({
                devGlowAccess: updatedData
            });
        } catch (error) {
            console.log(error.message);
            res.status(401).send({ error: 'Error updating post' });
        }
    },
    setBanner: async(req,res)=>{
        console.log(req.file);
        try {
            const userId = getTokenData(req)
            let fileUrl = undefined;
            if (req.file) {
                console.log(req.file);
                const file = req.file;
                const filePath = `uploads/${file.originalname}`;
                const storageRef = ref(storage, filePath);
                await uploadBytes(storageRef, file.buffer);
                fileUrl = await getDownloadURL(storageRef);
            }
             await userRepository.updateUser(userId,{banner_url:fileUrl });
            res.status(200).send({message:"banner set successful"})
        } catch (error) {
            console.log(error.message);
            res.status(401).send({ error: 'Error updating banner' });
        }
    }
}