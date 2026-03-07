const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    // read authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // remove Bearer from header
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user to request
        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT VERIFY ERROR:", error.message);

        return res.status(401).json({ message: "Invalid token" });

    }
};