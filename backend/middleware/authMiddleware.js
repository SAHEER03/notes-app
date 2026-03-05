// import jsonwebtoken library to verify token
const jwt = require("jsonwebtoken");

// export middleware function to verify JWT token and authenticate user
module.exports = (req, res, next) => {

    // get token from Authorization header
    const token = req.header.authorization?.split(" ")[1];

    // if token is not provided, user is not aauthenticated
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {

        // verify the token using the secret key from .env variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // store decoded user information in request object for use in other routes
        req.user = decoded;

        // call next middleware or route handler
        next();

    } catch (error) {

        // if token verification failes return unauthorized error messasge
        res.status(401).json({ message: "Invalid token" });
    }
}
    