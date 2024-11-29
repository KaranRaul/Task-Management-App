import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskForm: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("dueDate", dueDate);
        if (file) formData.append("file", file);

        try {
            await axios.post("http://localhost:5000/api/tasks", formData);
            toast.success("Task added successfully!");
        } catch (error) {
            toast.error("Failed to add task!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Add New Task</h2>
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
