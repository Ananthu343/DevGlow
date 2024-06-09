import CommunityRepository from "../../repositories/communityRepository.js"

const communityRepository = new CommunityRepository()


export const communityManageController = {
    restrictCommunity: async (req,res) => {
        try {
            let community = await communityRepository.findById(req.body.id)
            if (community.status === true) {
                community = await communityRepository.removeRestrictCommunity(community._id)
            } else {
                community = await communityRepository.restrictCommunity(community._id)
            }
            console.log(community.status);
            res.status(200).json({status:community.status})
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error: 'internal server error'})
        }
    },
}