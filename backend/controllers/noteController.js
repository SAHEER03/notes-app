
// Import Note model
const Note = require("../models/Note");
// Import User model
const User = require("../models/User");

// ++++++++++++++++++++++++++++++++++++++++++++++
// Create Note
// ++++++++++++++++++++++++++++++++++++++++++++++
exports.createNote = async (req, res) => {

    // exception handling 
    try {

        // get title and content from request body (sent from frontend)
        const { title, content } = req.body;

        // Create a new note object from authenticated user
        const note = new Note({
        title,
        content,
        owner: req.user.id
        });

        // save to database
        await note.save();

        // send create note as json response
        res.json(note);

    } catch (error) {
        // If find error , send server error
        res.status(500).json({ error: error.message });
    }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// get notes
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.getNotes = async (req, res) => {

    try {

        // finds all notes that "Are not deleted", "collabrator user"
        const notes = await Note.find({
        isDeleted: false,
        $or: [
            { owner: req.user.id },
            { collaborators: req.user.id }
        ]
        });

        // return the list of notes
        res.json(notes);

    } catch (error) {
        // if error is occured send server error
        res.status(500).json({ error: error.message });
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Update Note
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.updateNote = async (req, res) => {

    try {

        // find note by id from url parameter
        const note = await Note.findById(req.params.id);

        if (!note) {
            // if note does not exist, return 404 response error
            return res.status(404).json({ message: "Note is not found" });
        }

        // update note fields if provided in request body
        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;

        // save update note
        await note.save();

        // return update note
        res.json(note);

    } catch (error) {
        // if any error occur send server error
        res.status(500).json({ error: error.message });
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Delete Note
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.deleteNote = async (req, res) => {

    try {

        // find note by id
        const note = await Note.findById(req.params.id);

        if (!note) {
            // if note not find send 404 error
            return res.status(404).json({ message: "Note not found" });
        }

        // mark note as deleted instead of removing from DB
        note.isDeleted = true;

        await note.save();

        // Send confirmation message if deleted
        res.json({ message: "Note deleted (soft delete)" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// search notes
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.searchNotes = async (req, res) => {

    try {

        // get search query from request query parameters
        const q = req.query.q;

        // search notes using MongoDB text index
        const notes = await Note.find({
        $text: { $search: q },
        isDeleted: false
        });

        // return matches notes
        res.json(notes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// add collaborators
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.addCollaborator = async (req, res) => {

    try {

        // get email of collaborators from request body
        const { email } = req.body;

        // find user in database by email
        const user = await User.findOne({ email });

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }

        // find the note by ID from url parameter
        const note = await Note.findById(req.params.id);

        // add user ID to note collaborators array
        note.collaborators.push(user._id);

        // save updated note
        await note.save();

        // return updated note
        res.json(note);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};