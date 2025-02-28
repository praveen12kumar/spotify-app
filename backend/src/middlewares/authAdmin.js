export const requireAdmin = (req, res, next) => {
    try {
        const currentUser = req.user;
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.email;

        if(!isAdmin) {
            return res.status(403).json({
                success: false,
                data: {},
                message: "Unauthorized - You must be admin",
                err:{}
            })
        }
        next();
    } catch (error) {
        throw error;
    }
}