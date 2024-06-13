import jwt from "jsonwebtoken";

// Checking each role
const key = process.env.JWT_SECRET_KEY

export const checkRole = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.jwt;
            const decoded = jwt.verify(token, `${key}`);
            const userRoles = decoded.userRoles;
            const permittedRole = roles;
            let flag = false;
            permittedRole.forEach(element => {
                if (userRoles.includes(element)) {
                    flag = true
                }
            });
            if (flag) {
                next()
            } else {
                res.status(401);
                throw new Error("Not authorized, role failed");
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error');
        }
    };
};