import MessageRepository from "../../repositories/messageRepository.js";
import UserRepository from "../../repositories/userRepository.js";
import PostRepository from "../../repositories/postRepository.js";
import { dateFilter } from "../../utils/dateFilter.js";

const userRepository = new UserRepository()
const postRepository = new PostRepository()
const messageRepository = new MessageRepository()

export const dashboardController = {
    getDashboardData: async (req,res) => {
        try {
            const filter = req.query.filter.toString();
            let userData = await userRepository.getUserGraphData()
            userData = dateFilter(filter,userData)
            let postData = await postRepository.getPostGraphData()
            postData = dateFilter(filter,postData)
            let messageData = await messageRepository.getMessageGraphData()
            messageData = dateFilter(filter,messageData)
            let communityData = await messageRepository.getCommunityGraphData()
            communityData = dateFilter(filter,communityData)
            res.status(200).json({userData,postData,messageData,communityData})
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    }
}