// import expreess framework to create server and handle HTTP requests
const express = require('express');

// import core middleware to communicate frontend with backend
const cors = require('cors');

// Load environment variables from .env file
require('dotenv').config();

// import database connection function
const connectDB = require('./config/db');

// create an express application
const app = express();

// connect to MongoDB database
connectDB();

// enable Cors middleware to allow cross-origin requests from frontend
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Authenticated routes for user register and login APIs
app.use('/api/auth', require('./routes/authRoutes'));

// Notes routes for CRUD operations on notes
app.use('/api/notes', require('./routes/noteRoutes'));

// Define the port number for the server to listen on
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {

    // print message when server starts successfully
    console.log(`Server is running on port ${PORT}`);
});