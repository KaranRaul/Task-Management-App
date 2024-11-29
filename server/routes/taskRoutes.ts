import express from "express";
import multer from "multer";
import Task from "../models/Task";
import authMiddleware from "../middlewares/authMiddleware"; // Middleware to verify user token

const router = express.Router();

// File Upload Configuration
const upload = multer({ dest: "uploads/" });

// Create Task

// Get tasks for the logged-in user
router.get("/", authMiddleware, async (req: any, res) => {
    try {
        const userId = req.user.id; // Retrieved from middleware
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

// Create a new task
router.post("/", authMiddleware, async (req: any, res) => {
    const { title, description, status, dueDate } = req.body;
    const file = req.file?.path;

    try {
        const task = new Task({
            title,
            description,
            status,
            dueDate,
            file,
            userId: req.user.id, // Set userId from the token
        });
        await task.save();
        res.status(201).json(task || []);
    } catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
});
// Update Task
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(task || []);
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
