// Checking each role

export const checkRole = (...roles) => {
    return async (req, res, next) => {
       try {
        const userRoles = req.user.roles;
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