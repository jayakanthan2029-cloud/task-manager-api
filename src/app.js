const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Health route
app.get("/health", (req, res) => {
  res.json({ status: "API is running ✅", uptime: process.uptime() });
});

// Root route
app.get("/", (req, res) => {
  res.send(`
    <h2>Task Manager API is live ✅</h2>
    <p>Use the following endpoints:</p>
    <ul>
      <li>POST /api/users/register → create user</li>
      <li>POST /api/users/login → login to get token</li>
      <li>GET /api/users → requires token</li>
      <li>GET /api/tasks → requires token</li>
      <li>GET /health → check server status</li>
    </ul>
  `);
});

module.exports = app;