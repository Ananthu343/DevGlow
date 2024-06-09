import express from 'express'
import { protect } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleAuthorization.js";
import { dashboardController } from '../controllers/adminControllers/dashboardController.js';
import { userManageController } from '../controllers/adminControllers/userManageController.js';
import { communityManageController } from '../controllers/adminControllers/communityManageController.js';
import { badgeController } from '../controllers/adminControllers/badgeController.js';

const router = express.Router()

router.get('/getDashboardData',protect,checkRole("admin"),dashboardController.getDashboardData)
router.patch('/restrictUser',protect,checkRole("admin"),userManageController.restrictUser)
router.post('/addNewUser',protect,checkRole("admin"),userManageController.addNew)
router.patch('/addNewAdmin',protect,checkRole("admin"),userManageController.addNewAdmin)
router.patch('/restrictCommunity',protect,checkRole("admin"),communityManageController.restrictCommunity)
router.post('/addBadge',protect,checkRole("admin"),badgeController.addBadge)
router.patch('/editBadge',protect,checkRole("admin"),badgeController.editBadge)
router.delete('/deleteBadge',protect,checkRole("admin"),badgeController.deleteBadge)



export default router