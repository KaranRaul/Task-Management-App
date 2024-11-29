import express from "express";
import multer from "multer";
import Task from "../models/Task";

const router = express.Router();

// File Upload Configuration
const upload = multer({ dest: "uploads/" });

// Create Task
router.post("/", upload.single("file"), async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const file = req.file?.path;
    try {
        const task = new Task({ title, description, status, dueDate, file });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
});

// Get All Tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

// Update Task
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
});

// Delete Task
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
});

export default router;
