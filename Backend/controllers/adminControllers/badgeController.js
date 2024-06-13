import BadgeRepository from "../../repositories/badgeRepository.js"
import { app } from "../../configs/firebase.js";
import { getDownloadURL, getStorage, ref, uploadBytes, deleteObject } from "firebase/storage"

const badgeRepository = new BadgeRepository()
const storage = getStorage(app)

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
                const file = req.file;
                const filePath = `uploads/${file.originalname}`;
                const storageRef = ref(storage, filePath);
                await uploadBytes(storageRef, file.buffer);
                fileUrl = await getDownloadURL(storageRef);
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
                const file = req.file;
                const filePath = `uploads/${file.originalname}`;
                const storageRef = ref(storage, filePath);
                await uploadBytes(storageRef, file.buffer);
                fileUrl = await getDownloadURL(storageRef);
            }
            let dataToUpdate;
            const badgeId = req.body.id
            if (fileUrl) {
                const badgeData = await badgeRepository.findById(badgeId)
                const mediaUrl = badgeData.badge_url
                if (mediaUrl) {
                    const mediaRef = ref(storage, mediaUrl);
                    await deleteObject(mediaRef);
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
                const mediaRef = ref(storage, mediaUrl);
                await deleteObject(mediaRef);
            }
            await badgeRepository.deleteBadge(badgeId)
            res.status(200).send("community deleted successfully");
        } catch (error) {
            console.log(error.message);
            res.status(500).send({ error: "internal server error" })
        }
    },
}