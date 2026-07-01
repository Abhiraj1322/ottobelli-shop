const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/authRoutes.js");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // required so cookies (accessToken/refreshToken) are sent
  })
);
app.use(express.json()); // Allows server to accept JSON data in request bodies

app.use("/api/auth", authRoutes);
// Basic Test Route
app.get('/', (req, res) => {
  res.send('Ottobelli API is running successfully.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});