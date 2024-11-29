"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const Task_1 = __importDefault(require("../models/Task"));
const router = express_1.default.Router();
// File Upload Configuration
const upload = (0, multer_1.default)({ dest: "uploads/" });
// Create Task
router.post("/", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, status, dueDate } = req.body;
    const file = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
    try {
        const task = new Task_1.default({ title, description, status, dueDate, file });
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task" });
    }
}));
// Get All Tasks
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
}));
// Update Task
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updates = req.body;
    try {
        const task = yield Task_1.default.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task" });
    }
}));
// Delete Task
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield Task_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task" });
    }
}));
exports.default = router;
