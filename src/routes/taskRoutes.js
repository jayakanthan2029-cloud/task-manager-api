const express = require("express");
const requireAuth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} = require("../controllers/taskController");

const router = express.Router();

// Protect all routes
router.use(requireAuth);

// Task routes
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.patch("/:id", updateTaskById);
router.delete("/:id", deleteTaskById);

module.exports = router;