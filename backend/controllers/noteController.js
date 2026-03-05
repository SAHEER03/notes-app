const Note = require("../models/Note");
const User = require("../models/User");

exports.createNote = async (req, res) => {

    try {

        const { title, content } = req.body;

        const note = new Note({
        title,
        content,
        owner: req.user.id
        });

        await note.save();

        res.json(note);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

exports.getNotes = async (req, res) => {

    try {

        const notes = await Note.find({
        isDeleted: false,
        $or: [
            { owner: req.user.id },
            { collaborators: req.user.id }
        ]
        });

        res.json(notes);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    };

    exports.updateNote = async (req, res) => {

    try {

        const note = await Note.findById(req.params.id);

        if (!note) {
        return res.status(404).json({ message: "Note not found" });
        }

        note.title = req.body.title || note.title;
        note.content = req.body.content || note.content;

        await note.save();

        res.json(note);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

exports.deleteNote = async (req, res) => {

  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.isDeleted = true;

    await note.save();

    res.json({ message: "Note deleted (soft delete)" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

exports.searchNotes = async (req, res) => {

  try {

    const q = req.query.q;

    const notes = await Note.find({
      $text: { $search: q },
      isDeleted: false
    });

    res.json(notes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

exports.addCollaborator = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const note = await Note.findById(req.params.id);

    note.collaborators.push(user._id);

    await note.save();

    res.json(note);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};