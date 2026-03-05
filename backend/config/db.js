// import mongoose library
const mongoose = require("mongoose");

// create a function to connect to MongoDB database
const connectDB = async () => {
    try {

        // Connect to MongoDB using the connection string from environment variables
        await mongoose.connect (process.env.MONGO_URI);

        // if connection is successful, print message in console
        console.log("MongoDB connected successfully");

    } catch (error) {

        // if connection fails, prints error message
        console.error(error.message);

        // stop the server if database fails
        process.exit(1);
    }

};

// export the connectDB function to be used in other files
module.exports = connectDB;