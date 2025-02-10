const Note = require("../models/Notes");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Middleware to authenticate user
 const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// Create a note
 const createNote = async (req, res) => {
  try {
    const { title, content, audioUrl, imageUrl } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const note = new Note({ user: req.user.id, title, content, audioUrl, imageUrl });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get all notes for a user
 const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Update a note
 const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const note = await Note.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Delete a note
 const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};
module.exports = { authenticateUser, createNote, getNotes, updateNote, deleteNote };