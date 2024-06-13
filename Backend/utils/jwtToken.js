import jwt from 'jsonwebtoken'
import UserRepository from "../repositories/userRepository.js";
import dotenv from 'dotenv'
import { isValidObjectId } from 'mongoose';
dotenv.config()

const userRepository = new UserRepository()
const key = process.env.JWT_SECRET_KEY

export const generateToken = async (res, data) => {
    let token;
    if (isValidObjectId(data)) {
        const userId = data
        const user = await userRepository.findById(userId);
        const userRoles = user.roles;
        token = jwt.sign({ userId, userRoles }, `${key}`, { expiresIn: "30d" })
    } else {
        token = jwt.sign({ data }, `${key}`, { expiresIn: "30d" })
    }
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
    const data = decoded.data;
    if (userId) {
        return userId
    } else {
        return data
    }
}
