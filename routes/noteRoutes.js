const authMiddleware = require("../middleware/authMiddleware.js");
const express = require("express") ;
const{ createNote, getNotes, updateNote, deleteNote } = require("../controllers/noteController.js");


const router = express.Router();

// Create a note
router.post("/notes", authMiddleware, createNote);

// Get all notes for a user
router.get("/notes", authMiddleware, getNotes);

// Update a note
router.put("/notes/:id", authMiddleware, updateNote);

// Delete a note
router.delete("/notes/:id", authMiddleware, deleteNote);

module.exports =router;
