import express from "express"
import { userController } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/verify/email',userController.verifyEmail)
router.post('/verify/token',userController.verifyToken)
router.post('/login',userController.login)
router.get('/logout',userController.logout)

export default router