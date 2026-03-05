// import mongoose library
const mongoose = require("mongoose");

// create a schema for the user collection
const UserSchema = new mongoose.Schema({

    // User's name string
    name: {
        type: String,
        reuired: true
    },

    // User's email string
    email: {
        type: String,
        required: true,
        unique: true
    },

    // User's password string
    password: {
        type: String,
        required: true
    },
},
    // timestamps for createdAt and updatedAt
{ timestamps: true });

//export the model
module.exports = mongoose.model("User", UserSchema);
