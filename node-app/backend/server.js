const express = require("express");
const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiters
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

// Middleware
app.use(generalLimiter);
app.use(cors());
app.use(express.json());

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API route: Handle welcome form submission
app.post("/api/welcome", apiLimiter, (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  console.log(`Welcome submission received from: ${name} <${email}>`);

  res.json({
    success: true,
    message: `Welcome, ${name}! We have received your message and will be in touch at ${email}.`,
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Catch-all: serve the React app for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
