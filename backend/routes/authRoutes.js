// import express framework to create APIs handle HTTP requests
const express = require('express');

// Create a router object to define routes for authentication
const router = express.Router();

// import register and login functions from authController
const { register, login } = require('../controllers/authController');

// Route for user registration using POST method
router.post('/register', register);

// Route for user login using POST method
router.post('/login', login);

// Export the router to be used in the main application
module.exports = router;