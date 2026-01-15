exports.roleCheck = (...allowedRoles) => {
    return (req, res, next) => {
        console.log(req.user.role)
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message: "You don`t have access to this resource"});
        }
        next()
    };
};
