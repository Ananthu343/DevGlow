import Badge from "../models/badgeDb";

class BadgeRepository{
    async save(badge){
        const newBadge = new Badge(badge)
        return await newBadge.save()
    }
    async findById(id){
        return await Badge.findById(id)
    }
}

export default BadgeRepository