// Import express framework to create APIs handle HTTP requests
const express = require('express');

// Create a router object to define routes for notes
const router = express.Router();

// Import authenticate middleware to logged using JWT token
const authenticate = require('../middleware/authMiddleware');

// Import note controller functions for note operations 
const { 
    createNote, 
    getNotes, 
    updateNote, 
    deleteNote,
    searchNotes,
    addCollaborator 
} = require('../controllers/noteController');

// Create a new note 
router.post('/', authenticate, createNote);

// Get all notes for authenticated logged-in user
router.get('/', authenticate, getNotes);

// Update a existing note by ID
router.put('/:id', authenticate, updateNote);

// Delete a note by ID
router.delete('/:id', authenticate, deleteNote);

// Search notes by keywords
router.get('/search', authenticate, searchNotes);

// Add a collaborator to a note by ID
router.post('/:id/collaborators', authenticate, addCollaborator);

// Export the router to be used in the main application
module.exports = router;