import express from "express"
import { authController } from "../controllers/userControllers/userAuthController.js";
import { postController } from "../controllers/userControllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../configs/multer.js"; 

const router = express.Router()

router.post('/verify/email',authController.verifyEmail)
router.post('/verify/token',authController.verifyToken)
router.post('/login',authController.login)
router.post('/upload-post',protect,upload.single('fileUpload'),postController.uploadPost)
router.patch('/edit-post',protect,upload.single('fileUpload'),postController.editPost)
router.delete('/delete-post',protect,postController.deletePost)
router.get('/get-feed',postController.getFeed)
router.get('/get-users',postController.getusers)
router.get('/logout',authController.logout)

export default router