import mongoose from "mongoose";

const BadgeSchema = new mongoose.Schema({
    badge_name: {
        type: String,
    },
    badge_url: {
        type: String,
    },
    min_stars: {
        type: Number,
    },
    createdAt: { type: Date, default: Date.now }
})

const Badge = mongoose.model("Badges", BadgeSchema);

export default Badge