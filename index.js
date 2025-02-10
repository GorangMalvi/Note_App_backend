const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/noteRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", authRoutes);
app.use("/api", notesRoutes);
// Connect to MongoDB
connectDB();

// Start the server
app.listen(8080, () => {
    console.log("Server is running at http://localhost:8080");
});