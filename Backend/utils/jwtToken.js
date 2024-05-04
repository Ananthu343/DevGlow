import jwt from 'jsonwebtoken'
import UserRepository from "../repositories/userRepository.js";
import dotenv from 'dotenv'
dotenv.config()

const userRepository = new UserRepository()
const key = process.env.JWT_SECRET_KEY

export const generateToken = async (res, userId) => {
    const user = await userRepository.findById(userId);
    const userRoles =  user.roles;
    const token = jwt.sign({ userId,userRoles }, `${key}`, { expiresIn: "30d" })

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
    return token
}

export const deleteToken = (res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        expires: new Date(0),
    });
}

export const getTokenData = (req) => {
    const token = req.cookies.jwt; 
    const decoded = jwt.verify(token, `${key}`); 
    const userId = decoded.userId; 
    return userId
}
