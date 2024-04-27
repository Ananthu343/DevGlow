import UserRepository from "../../repositories/userRepository.js";

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
    }
}