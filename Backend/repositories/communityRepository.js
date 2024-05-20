import Community from "../models/communityDb.js";

class CommunityRepository{
    async save(community){
        const newCommunity = new Community(community)
        return await newCommunity.save()
    }
    async findById(id) {
        return await Community.findById(id);
    }
}

export default CommunityRepository