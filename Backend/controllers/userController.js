import { generateToken, getTokenData, deleteToken } from "../utils/jwtToken.js";
import UserRepository from "../repositories/userRepository.js";
import nodemailer from "nodemailer"
import crypto from "crypto"

const userRepository = new UserRepository()

export const userController = {
    verifyEmail: async (req, res) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'Gmail', // or another email service
                auth: {
                    user: process.env.MY_EMAIL,
                    pass: process.env.MY_PASS,
                },
            });
            const { email } = req.body;
            const userExists = await userRepository.findByEmail(email)
            if (userExists) {
                res.status(401).send({ error: "Invalid credentials" });
                throw new Error("user already exists");
            }
            generateToken(res, req.body);
            const token = crypto.randomBytes(5).toString('hex'); // Generate a unique token
            const applicantData = {
                username: "Applicant",
                email,
                password: "Applicant",
                token,
            }
            await userRepository.save(applicantData)
            const mailOptions = {
                from: "devglow001@gmail.com",
                to: email,
                subject: 'Email Verification',
                text: `Please verify your email by clicking the following link: http://localhost:3000/verifyEmail/${token}`,
            };
            try {
                await transporter.sendMail(mailOptions);
                res.status(200).send({ message: 'Verification email sent successfully' });
            } catch (error) {
                console.log(error.message);
                res.status(500).send({ message: 'Failed to send verification email' });
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    verifyToken: async (req, res) => {
        try {
            const data = getTokenData(req)
            const { token } = req.body
            const { email } = data
            const applicant = await userRepository.findByEmail(email)
            if(applicant.token !== "verified"){
                if (applicant && applicant.token == token) {
                    await userRepository.updateUser(applicant._id, { ...data, token: "verified" })
                    deleteToken(res)
                    res.status(200).json({ message: "token verified" })
                } else {
                    await userRepository.deleteUser(applicant._id)
                    deleteToken(res)
                    res.status(401).send({ error: "Invalid token" });
                }
            }
        } catch (error) {
            console.log(error.message, "verifyToken");
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userRepository.findByEmail(email);
            if (user && (await user.matchPassword(password))) {
                generateToken(res, user._id);
                res.status(200).json({
                    devGlowAccess: true
                });
            } else {
                throw new Error("Invalid email or password");
            }
        } catch (error) {
            res.status(401).send({ error: "Invalid credentials" });
            console.log(error.message);
        }
    },
    logout: async (req,res)=>{
        try {
            deleteToken(res)
            res.status(200).json({ message: "Logged out successfully" });
        } catch (error) {
            console.log(error.message);
        }
    },
}