exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.headers.role)) {
            return next(
                res.status(403).json({Role:`${req.user.role} is not allowed to access this resource`})
            );
        }

        next();
    };
};