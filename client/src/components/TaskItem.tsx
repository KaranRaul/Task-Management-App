import React, { useState } from "react";
import { deleteTask, updateTaskStatus } from "../services/api";
import { AlertCircle, CheckCircle, Clock, Trash2, CircleCheck, MoreVertical, Edit, Calendar } from "lucide-react";

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

interface TaskItemProps {
    task: Task;
    setAlert: React.Dispatch<React.SetStateAction<{ type: string; message: string } | null>>;
    getAllTask: () => void;
}

const statusIcons: Record<string, JSX.Element> = {
    "Pending": <AlertCircle className="text-yellow-500" />,
    "In Progress": <Clock className="text-blue-500" />,
    "Completed": <CheckCircle className="text-green-500" />,
};

const statusColors: Record<string, { bg: string, text: string, border: string }> = {
    "Pending": { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
    "In Progress": { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" },
    "Completed": { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
};

const TaskItem: React.FC<TaskItemProps> = ({ task, setAlert, getAllTask }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const dueDate = new Date(task.dueDate);
    const today = new Date();
    const isOverdue = dueDate < today && task.status !== "Completed";

    const formatDueDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task._id);
            getAllTask();
            setAlert({ type: "danger", message: "Task deleted successfully!" });
        } catch (error) {
            setAlert({ type: "danger", message: "Failed to delete task!" });
        } finally {
            setConfirmDelete(false);
        }
    };

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            await updateTaskStatus(task._id, newStatus);
            getAllTask();
            setAlert({ type: "success", message: `Task marked as ${newStatus}!` });
            setTimeout(() => setAlert(null), 4000);
        } catch (error) {
            setAlert({ type: "danger", message: "Failed to update task status!" });
            setTimeout(() => setAlert(null), 4000);
        }
    };

    // Get the appropriate status styling
    const statusStyle = statusColors[task.status] || statusColors["Pending"];

    return (
        <div className={`bg-white rounded-lg shadow-sm border-l-4 hover:shadow-md transition-shadow overflow-hidden ${task.status === "Completed" ? "border-green-500" :
                isOverdue ? "border-red-500" :
                    task.status === "In Progress" ? "border-blue-500" :
                        "border-yellow-500"
            }`}>
            <div className="p-5">
                <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{task.title}</h3>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                        >
                            <MoreVertical size={18} />
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                {task.status !== "Completed" && (
                                    <button
                                        onClick={() => {
                                            handleStatusUpdate("Completed");
                                            setShowDropdown(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <CircleCheck size={16} className="mr-2 text-green-500" />
                                        Mark as Completed
                                    </button>
                                )}
                                {task.status === "Pending" && (
                                    <button
                                        onClick={() => {
                                            handleStatusUpdate("In Progress");
                                            setShowDropdown(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <Clock size={16} className="mr-2 text-blue-500" />
                                        Start Progress
                                    </button>
                                )}
                                {task.status === "In Progress" && (
                                    <button
                                        onClick={() => {
                                            handleStatusUpdate("Pending");
                                            setShowDropdown(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <AlertCircle size={16} className="mr-2 text-yellow-500" />
                                        Mark as Pending
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setConfirmDelete(true);
                                        setShowDropdown(false);
                                    }}
                                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 size={16} className="mr-2" />
                                    Delete Task
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
                        <div className={`flex items-center px-3 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                            {statusIcons[task.status]}
                            <span className="ml-1 text-sm font-medium">{task.status}</span>
                        </div>
                    </div>

                    <div className={`flex items-center text-sm ${isOverdue ? "text-red-600" : "text-gray-500"}`}>
                        <Calendar size={16} className="mr-1" />
                        {formatDueDate(dueDate)}
                        {isOverdue && <span className="ml-1 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Overdue</span>}
                    </div>
                </div>
            </div>

            {/* Delete confirmation overlay */}
            {confirmDelete && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
                        <h3 className="text-lg font-bold mb-4">Delete Task?</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;