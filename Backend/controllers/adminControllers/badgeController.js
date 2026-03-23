import BadgeRepository from "../../repositories/badgeRepository.js"
import { uploadToCloudinary, deleteFromCloudinary } from "../../configs/cloudinary.js";

const badgeRepository = new BadgeRepository()

export const badgeController = {
    getBadges: async (req, res) => {
        try {
            const badgeData = await badgeRepository.getAllBadge()
            res.status(200).send(badgeData)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "internal server error" })
        }
    },
    addBadge: async (req, res) => {
        console.log("workingg", req.body);
        try {
            let fileUrl = undefined;
            if (req.file) {
                fileUrl = await uploadToCloudinary(req.file.buffer);
            }
            if (!req.body.name) {
                return res.status(401).send({ error: 'Error creating badge' });
            }
            let newBadge = {
                badge_name: req.body.name,
                badge_url: fileUrl,
                min_stars: req.body.minStars
            };
            newBadge = await badgeRepository.save(newBadge);
            res.status(200).send(newBadge);
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: 'internal server error' })
        }
    },
    editBadge: async (req, res) => {
        try {
            let fileUrl = undefined;
            if (req.file) {
                fileUrl = await uploadToCloudinary(req.file.buffer);
            }
            let dataToUpdate;
            const badgeId = req.body.id
            if (fileUrl) {
                const badgeData = await badgeRepository.findById(badgeId)
                const mediaUrl = badgeData.badge_url
                if (mediaUrl) {
                    await deleteFromCloudinary(mediaUrl);
                }
                dataToUpdate = {
                    badge_name: req.body.name,
                    min_stars: req.body.minStars,
                    badge_url: fileUrl,
                };
            } else {
                dataToUpdate = {
                    badge_name: req.body.name,
                    min_stars: req.body.minStars,
                };
            }
            const updatedData = await badgeRepository.editBadge(badgeId, dataToUpdate)
            res.status(200).send(updatedData)
        } catch (error) {
            res.status(500).send({ error: 'internal server error' })
            console.log(error.message);
        }
    },
    deleteBadge: async (req, res) => {
        try {
            const badgeId = req.query.id;
            const badgeData = await badgeRepository.findById(badgeId)
            const mediaUrl = badgeData.badge_url
            if (mediaUrl) {
                await deleteFromCloudinary(mediaUrl);
            }
            await badgeRepository.deleteBadge(badgeId)
            res.status(200).send("community deleted successfully");
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "internal server error" })
        }
    },
}