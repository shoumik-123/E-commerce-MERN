exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        console.log("req.user", req.role)

        if (!roles.includes(req.user.role)) {
            return next(
                res.status(403).json({Role:`${req.user.role} is not allowed to access this resource`})
            );
        }

        next();
    };
};