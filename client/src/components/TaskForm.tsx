import React, { useState } from "react";
import { Calendar, ClipboardList, Tag, Plus, Upload } from "lucide-react";
import Alert from "./Alert";
import { createTask } from "../services/api";

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
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("dueDate", dueDate);
        formData.append("status", status);
        if (file) formData.append("file", file);

        try {
            const newTask = await createTask(formData);
            addTask(newTask);
            setAlert({ type: "success", message: "Task added successfully!" });
            setTimeout(() => setAlert(null), 3000);

            // Reset form fields
            setTitle("");
            setDescription("");
            setDueDate("");
            setStatus("Pending");
            setFile(null);
            setIsExpanded(false);
        } catch (error) {
            setAlert({ type: "danger", message: "Failed to add task. Please try again!" });
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transition-all duration-300">
            {!isExpanded ? (
                <div
                    className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50"
                    onClick={() => setIsExpanded(true)}
                >
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                            <Plus className="text-blue-600" size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Add New Task</h2>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors shadow-sm flex items-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(true);
                        }}
                    >
                        <Plus size={18} className="mr-1" />
                        New Task
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-xl font-bold mb-6 text-center text-gray-800">Add New Task</h2>
                    {alert && <Alert type={alert.type as "success" | "danger"} message={alert.message} />}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="flex items-center mb-2 font-medium text-gray-700">
                                <ClipboardList size={18} className="mr-2 text-blue-500" />
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter task title"
                                required
                            />
                        </div>

                        <div>
                            <label className="flex items-center mb-2 font-medium text-gray-700">
                                <Calendar size={18} className="mr-2 text-blue-500" />
                                Due Date
                            </label>
                            <input
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center mb-2 font-medium text-gray-700">
                            <Tag size={18} className="mr-2 text-blue-500" />
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            rows={4}
                            placeholder="Describe your task here..."
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="flex items-center mb-2 font-medium text-gray-700">
                            <Tag size={18} className="mr-2 text-blue-500" />
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                            required
                        >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-colors shadow-sm flex items-center"
                        >
                            <Plus size={18} className="mr-2" />
                            Add Task
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default TaskForm;