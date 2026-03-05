// Import the user model
const User = require("../models/User");

// import bcrypt to hash passwords for high security
const bcrypt = require("bcryptjs");

// import jsonwebtoken to create authentication tokens for users
const jwt = require("jsonwebtoken");


// ++++++++++++++++++++++++++++++++++++++
// Register function to create a new user
// ++++++++++++++++++++++++++++++++++++++

exports.register = async (req, res) => {

    // Exception handling
    try {
        
        // Get name, email, password from request body
        const { name, email, password } = req.body;

        // Check the user is already register or not by email
        let user = await User.findOne({ email });

        if (user) {
            // If already user is exist then return error message
            return res.status(400).json({ message: "You already have an account" });
        }

        // Hash password for security before it saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user 
        user = new User({
        name,
        email,
        password: hashedPassword
        });

        // save user to database
        await user.save();

        // Return success message to user
        res.json({ message: "Account successfully registered" });

    } catch (error) {
        // to find the error and return error message to user
        res.status(500).json({ error: error.message });
    }

};


// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Login function to authenticate user and return token
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

exports.login = async (req, res) => {

    try {

        // Get email and password from request
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            // If user is not exist then return error message
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            // If password does not match then return error message
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If credentials are valid, create a JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Send token and user info to user frontend
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        // handle server error and return error message to user
        res.status(500).json({ error: error.message });
    }

};