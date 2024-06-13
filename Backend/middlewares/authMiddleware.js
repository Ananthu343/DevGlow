import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            try {
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