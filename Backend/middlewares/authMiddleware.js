import jwt from "jsonwebtoken";
import UserRepository from "../repositories/userRepository.js";
import dotenv from 'dotenv'
dotenv.config()

const userRepository = new UserRepository()

const key = process.env.JWT_SECRET_KEY

export const protect = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if (token) {
            try {
                const decoded = jwt.verify(token,`${key}`);
                req.user = await userRepository.findById(decoded.userId);
                next();
            } catch (error) {
                console.log(error.message);
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        } else {
            res.status(401);
            throw new Error("Not authorized, no token");
        }
    } catch (error) {
        console.log(error);
    }
}