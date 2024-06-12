import MessageRepository from "../../repositories/messageRepository.js";
import RoomRepository from "../../repositories/roomRepository.js";
import { getTokenData } from "../../utils/jwtToken.js";

const messageRepository = new MessageRepository()
const roomRepository = new RoomRepository()

export const messageController = {
    getMessageHistory : async(req,res)=>{
        console.log("worked",req.query.id);
        try {
            const myId = getTokenData(req)
            const data = await messageRepository.getHistory(myId,req.query.id)
            res.status(200).json({messageHistory : data})
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    },
    getRoomId: async(req,res) =>{
        try {
            let userId = req.query.id
            let myId = getTokenData(req)
            const room = await roomRepository.findByConnections([userId,myId]);
            res.status(200).send(room._id)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    }
}