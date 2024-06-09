import UserRepository from "../../repositories/userRepository.js";

const userRepository = new UserRepository()


export const userManageController = {
    restrictUser: async (req,res) => {
        try {
            let user = await userRepository.findById(req.body.id)
            if (user.status === true) {
                user = await userRepository.removeRestrictUser(user._id)
            } else {
                user = await userRepository.restrictUser(user._id)
            }
            console.log(user.status);
            res.status(200).json({status:user.status})
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    },
    addNew: async (req,res) => {
        try {
            const newData = {
                ...req.body,
                isVerified:true
            }
            const newUser = await userRepository.save(newData)
            console.log(newUser);
            res.status(200).send(newUser)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    },
    addNewAdmin: async (req,res) =>{
        try {
            let user = await userRepository.findById(req.body.id)
            if (user.roles.includes("admin")) {
                user = await userRepository.pullFromRoles(user._id)
            } else {
                user = await userRepository.pushIntoRoles(user._id)
            }
            res.status(200).send(user.roles)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    }
}