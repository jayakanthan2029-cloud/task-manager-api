const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes); // can also use "/api/auth" if preferred
app.use("/api/tasks", taskRoutes);

// Health route
app.get("/health", (req, res) => {
  res.json({ status: "API is running ✅", uptime: process.uptime() });
});

// Optional root route
app.get("/", (req, res) => {
  res.send("Task Manager API is live!");
});

module.exports = app;