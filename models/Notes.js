const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    audioUrl: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
