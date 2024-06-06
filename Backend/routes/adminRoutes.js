import express from 'express'
import { protect } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleAuthorization.js";
import { dashboardController } from '../controllers/adminControllers/dashboardController.js';

const router = express.Router()

router.get('/getDashboardData',protect,checkRole("admin"),dashboardController.getDashboardData)


export default router