import MessageRepository from "../../repositories/messageRepository.js";
import { getTokenData } from "../../utils/jwtToken.js";

const messageRepository = new MessageRepository()

export const messageController = {
    getMessageHistory : async(req,res)=>{
        try {
            const myId = getTokenData(req)
            const data = await messageRepository.getHistory(myId,req.query.id)
            res.status(200).json({messageHistory : data})
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    }
}