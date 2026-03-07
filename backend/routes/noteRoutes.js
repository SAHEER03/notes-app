// Import express framework
const express = require('express');

// Create router
const router = express.Router();

// Import middleware
const authMiddleware = require('../middleware/authMiddleware');

// Import controller functions
const {
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    searchNotes,
    addCollaborator
} = require('../controllers/noteController');

// Create a new note
router.post('/', authMiddleware, createNote);

// Get all notes
router.get('/', authMiddleware, getNotes);

// Update note
router.put('/:id', authMiddleware, updateNote);

// Delete note
router.delete('/:id', authMiddleware, deleteNote);

// Search notes
router.get('/search', authMiddleware, searchNotes);

// Add collaborator
router.post('/:id/collaborator', authMiddleware, addCollaborator);

module.exports = router;