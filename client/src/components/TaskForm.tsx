import React, { useState } from "react";
import Alert from "./Alert"; // Import Alert component
import { createTask } from "../services/api"; // Centralized API function

// Define Task interface to be used for the task object
interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

const TaskForm = ({ addTask }: { addTask: (task: Task) => void }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [status, setStatus] = useState<string>("Pending");
    const [file, setFile] = useState<File | null>(null);
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("dueDate", dueDate);
        formData.append("status", status);
        if (file) formData.append("file", file);

        try {
            const newTask = await createTask(formData); // API call to create a task
            addTask(newTask); // Update task list by calling the addTask function passed from parent
            setAlert({ type: "success", message: "Task added successfully!" });
            setTimeout(() => setAlert(null), 5000); // Auto-clear alert after 5 seconds

            // Reset form fields
            setTitle("");
            setDescription("");
            setDueDate("");
            setStatus("Pending");
            setFile(null);
        } catch (error) {
            setAlert({ type: "danger", message: "Failed to add task. Please try again!" });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Add New Task</h2>
            {alert && <Alert type={alert.type as "success" | "danger"} message={alert.message} />}

            <div className="mb-4">
                <label className="block mb-2 font-semibold">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-semibold">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-semibold">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-semibold">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-semibold">File (optional)</label>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
