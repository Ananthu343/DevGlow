import Badge from "../models/badgeDb.js";

class BadgeRepository{
    async save(badge){
        const newBadge = new Badge(badge)
        return await newBadge.save()
    }
    async findById(id){
        return await Badge.findById(id)
    }
    async editBadge(id,data){
        return await Badge.findOneAndUpdate({ _id:id }, data ,{ new:true })
    }
    async deleteBadge(id) {
        return await Badge.deleteOne({ _id: id });
    }
    async getAllBadge(){
        return await Badge.find().sort({createdAt:-1})
    }
    async getBadgeId(totalStars){
        return await Badge.findOne({min_stars : {$lte: totalStars  }},{_id: 1})
    }
}

export default BadgeRepository