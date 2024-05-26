import express from "express"
import { authController } from "../controllers/userControllers/userAuthController.js";
import { postController } from "../controllers/userControllers/postController.js";
import { profileController } from "../controllers/userControllers/profileController.js";
import { messageController } from "../controllers/userControllers/messageController.js";
import { communityController } from "../controllers/userControllers/communityController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleAuthorization.js";
import { upload } from "../configs/multer.js"; 

const router = express.Router()

router.post('/verify/email',authController.verifyEmail)
router.post('/verify/token',authController.verifyToken)
router.post('/login',authController.login)
router.post('/upload-post',protect,upload.single('fileUpload'),postController.uploadPost)
router.patch('/edit-post',protect,upload.single('fileUpload'),postController.editPost)
router.delete('/delete-post',protect,checkRole("user","admin"),postController.deletePost)
router.get('/get-feed',postController.getFeed)
router.get('/get-users',postController.getusers)
router.get('/get-communities',communityController.getCommunities)
router.patch('/joinCommunity',protect,checkRole("user"),communityController.joinCommunity)
router.patch('/leaveCommunity',protect,checkRole("user"),communityController.leaveCommunity)
router.patch('/community/addUser',protect,checkRole("user","admin"),communityController.addUser)
router.patch('/editCommunity',protect,checkRole("user"),upload.single('fileUpload'),communityController.editCommunity)
router.delete('/delete-community',protect,checkRole("user","admin"),communityController.deleteCommunity)
router.get('/getCommunityHistory',protect,checkRole("user"),communityController.getCommunityHistory)
router.get('/getUserData',profileController.getUserData)
router.get('/getPostData',postController.getPostData)
router.get('/getRankings',postController.getLeaderboardData)
router.get('/getMyProfilePosts',protect,checkRole("user"),postController.getMyProfilePosts)
router.patch('/savePost',protect,checkRole("user"),postController.savePost)
router.patch('/likePost',protect,checkRole("user"),postController.likePost)
router.post('/comment',protect,checkRole("user"),postController.comment)
router.get('/getPostcomment',postController.getPostComments)
router.get('/getMessageHistory',protect,checkRole("user"),messageController.getMessageHistory)
router.delete('/deleteComment',protect,checkRole("user","admin"),postController.deleteComment)
router.patch('/reportUser',protect,checkRole("user"),profileController.reportUser)
router.patch('/followUser',protect,checkRole("user"),profileController.followUser)
router.patch('/blockUser',protect,checkRole("user"),profileController.blockUser)
router.patch('/editProfile',protect,upload.single('fileUpload'),profileController.editProfile)
router.patch('/setBanner',protect,upload.single('fileUpload'),profileController.setBanner)
router.post('/create-community',protect,upload.single('fileUpload'),communityController.createCommunity)

router.get('/logout',authController.logout)

export default router