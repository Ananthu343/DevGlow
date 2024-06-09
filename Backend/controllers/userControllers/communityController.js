import CommunityRepository from "../../repositories/communityRepository.js";
import { getTokenData } from "../../utils/jwtToken.js";
import { app } from "../../configs/firebase.js";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage"
import RoomRepository from "../../repositories/roomRepository.js";
import MessageRepository from "../../repositories/messageRepository.js";
import UserRepository from "../../repositories/userRepository.js";

const communityRepository = new CommunityRepository()
const roomRepository = new RoomRepository()
const messageRepository = new MessageRepository()
const userRepository = new UserRepository()
const storage = getStorage(app)

export const communityController = {
    getCommunities: async (req, res) => {
        try {
            const communityData = await communityRepository.getAllCommunities()
            res.status(200).json({ communityData })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "internal server error" })
        }
    },
    createCommunity: async (req, res) => {
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
                name: req.body.name,
                description: req.body.description,
                privacy: req.body.privacy,
                user_limit: req.body.userLimit,
                profile_url: fileUrl,
                members: [user]
            };

            newCommunity = await communityRepository.save(newCommunity);
            await roomRepository.saveCommunityRoom(newCommunity._id)
            res.status(200).json({ newCommunity });
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: 'internal server error' })
        }
    },
    joinCommunity: async (req, res) => {
        try {
            const communityId = req.body.id;
            const myId = getTokenData(req)
            const updatedData = await communityRepository.addToMembers(communityId, myId)
            res.status(200).json({ updatedData })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: 'internal server error' })
        }
    },
    leaveCommunity: async (req, res) => {
        try {
            const communityId = req.body.id;
            const myId = getTokenData(req)
            const updatedData = await communityRepository.pullFromMembers(communityId, myId)
            res.status(200).json({ updatedData })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: 'internal server error' })
        }
    },
    editCommunity: async (req, res) => {
        try {
            let fileUrl = undefined;
            if (req.file) {
                const file = req.file;
                const filePath = `uploads/${file.originalname}`;
                const storageRef = ref(storage, filePath);
                await uploadBytes(storageRef, file.buffer);
                fileUrl = await getDownloadURL(storageRef);
            }
            let dataToUpdate;
            const communityId = req.body.id
            if (fileUrl) {
                const communityData = await communityRepository.findById(communityId)
                const mediaUrl = communityData.profile_url
                if (mediaUrl) {
                    const mediaRef = ref(storage, mediaUrl);
                    await deleteObject(mediaRef);
                }
                dataToUpdate = {
                    name: req.body.name,
                    description: req.body.description,
                    privacy: req.body.privacy,
                    user_limit: req.body.userLimit,
                    profile_url: fileUrl,
                };
            } else {
                dataToUpdate = {
                    name: req.body.name,
                    description: req.body.description,
                    privacy: req.body.privacy,
                    user_limit: req.body.userLimit,
                };
            }
            const updatedData = await communityRepository.editCommunity(communityId, dataToUpdate)
            res.status(200).json({ updatedData })
        } catch (error) {
            res.status(500).send({ error: 'internal server error' })
            console.log(error.message);
        }
    },
    deleteCommunity: async (req, res) => {
        try {
            const communityId = req.query.id;
            const myId = getTokenData(req)
            const myData = await userRepository.findById(myId)
            const communityData = await communityRepository.findById(communityId)
            if (communityData.creatorId == myId || myData.roles.includes("admin")) {
                await communityRepository.deleteCommunity(communityData._id)
                const mediaUrl = communityData.profile_url
                if (mediaUrl) {
                    const mediaRef = ref(storage, mediaUrl);
                    await deleteObject(mediaRef);
                }
                await roomRepository.deleteRoomBycommunity(communityId)
                res.status(200).send("community deleted successfully");
            } else {
                res.status(401).send("Unauthorized operation")
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "internal server error" })
        }
    },
    getCommunityHistory : async(req,res)=>{
        try {
            const communityId = req.query.id
            const data = await messageRepository.getCommunityHistory(communityId)
            res.status(200).json({communityHistory : data})
            console.log(data);
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "internal server error" })
        }
    },
    addUser : async(req,res)=>{
        try {
            const communityId = req.body.communityId
            const userId = req.body.newUserId
            const communityData = await communityRepository.findById(communityId)
            let updatedData;
            if (communityData.members.includes(userId)) {
                 updatedData = await communityRepository.pullFromMembers(communityId,userId)
            } else {
                 updatedData = await communityRepository.addToMembers(communityId,userId)
            }
            res.status(200).json({updatedData})
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "internal server error" })
        }
    }
}