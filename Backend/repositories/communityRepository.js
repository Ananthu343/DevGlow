import Community from "../models/communityDb.js";

class CommunityRepository {
    async save(community) {
        const newCommunity = new Community(community)
        return await newCommunity.save()
    }
    async findById(id) {
        return await Community.findById(id);
    }
    async getAllCommunities() {
        return await Community.find().sort({ createdAt: -1 })
    }
    async addToMembers(communityId, userid) {
        return await Community.findOneAndUpdate({ _id: communityId }, { $addToSet: { members: userid } }, { new: true })
    }
    async pullFromMembers(communityId, userid) {
        return await Community.findOneAndUpdate({ _id: communityId }, { $pull: { members: userid } }, { new: true })
    }
    async editCommunity(id, data) {
        return await Community.findOneAndUpdate({ _id: id }, data, { new: true })
    }
    async deleteCommunity(id) {
        return await Community.deleteOne({ _id: id });
    }
    async restrictCommunity(id) {
        return await Community.findByIdAndUpdate(id, { status: true }, { new: true })
    }
    async removeRestrictCommunity(id) {
        return await Community.findByIdAndUpdate(id, { status: false }, { new: true })
    }
}

export default CommunityRepository