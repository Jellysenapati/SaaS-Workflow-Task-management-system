const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch tasks.", error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required." });
    }

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Unable to create task.", error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update task.", error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(200).json({ message: "Task deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Unable to delete task.", error: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const todo = tasks.filter((t) => t.status === "todo").length;

    const completionRate = total ? Math.round((completed / total) * 100) : 0;
    const overdue = tasks.filter(
      (t) => t.dueDate && t.status !== "completed" && new Date(t.dueDate) < new Date()
    ).length;

    return res.status(200).json({
      totals: { total, completed, inProgress, todo, overdue, completionRate },
      byStatus: [
        { name: "To Do", value: todo },
        { name: "In Progress", value: inProgress },
        { name: "Completed", value: completed }
      ],
      byPriority: [
        { name: "Low", value: tasks.filter((t) => t.priority === "low").length },
        { name: "Medium", value: tasks.filter((t) => t.priority === "medium").length },
        { name: "High", value: tasks.filter((t) => t.priority === "high").length }
      ]
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to fetch analytics.", error: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getAnalytics };
