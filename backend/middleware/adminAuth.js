const adminAuth = (req, res, next) => {

    const email = req.headers["admin-email"];
    const password = req.headers["admin-password"];

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        next();
    } else {

        res.status(401).json({
            success: false,
            message: "Admin authentication failed"
        });

    }
};

module.exports = adminAuth;