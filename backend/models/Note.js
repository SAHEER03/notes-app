// import mongoose library
const mongoose = require("mongoose");

// create a schema for notes collection
const NoteSchema = new mongoose.Schema(
    {
        // Note's title string
        title: {
            type: String,
            required: true
        },

        // Note's content string
        content: {
            type: String,
            required: true
        },

        // Reference to the user who owns the note
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            
        },

        // collabrators array to store the user id of collabrators
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        // permanent delete flag to mark the note as deleted
        isDeleted: {
            type: Boolean,
            default: false
        }

        
    },

    // timestamps for createdAt and updatedAt
    { timestamps: true }
)

// create text index for search fielss functionality
NoteSchema.index({ title: "text", content: "text" });

// export the model
module.exports = mongoose.model("Note", NoteSchema);