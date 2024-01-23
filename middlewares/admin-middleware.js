const adminMiddleware = async (req, res, next) => {
    try {
        const admin = req.user.isAdmin;
        if (!admin) {
            return res.status(403).json({ message: "Access Denied! Unauthorized Access" });
        }
        // res.status(200).json({msg: req.user.isAdmin});
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = adminMiddleware;