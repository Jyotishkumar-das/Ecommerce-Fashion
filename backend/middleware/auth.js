const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {

    try {

        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first"
            });
        }

        const tokenValue = token.startsWith("Bearer ")
            ? token.split(" ")[1]
            : token;

        const decoded = jwt.verify(
            tokenValue,
            process.env.JWT_SECRET
        );

        req.userId = decoded.userId;

        next();

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }
};

module.exports = auth;