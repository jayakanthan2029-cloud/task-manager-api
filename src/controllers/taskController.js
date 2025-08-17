// src/controllers/taskController.js
const Task = require("../models/task");

// ✅ Create Task
exports.createTask = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const task = await Task.create({
      title,
      completed: completed || false,
      owner: req.user.id,
    });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// ✅ Get All Tasks (for logged-in user)
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

// ✅ Get Task by ID
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// ✅ Update Task
exports.updateTaskById = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

// ✅ Delete Task
exports.deleteTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(204).send(); // No content
  } catch (err) {
    next(err);
  }
};