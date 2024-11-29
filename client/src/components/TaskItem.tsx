import React from "react";
import toast from "../utils/toastConfig";
import { deleteTask, updateTaskStatus } from "../services/api";

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
    // Handle Task Deletion
    const handleDelete = async () => {
        try {
            await deleteTask(task._id); // Using centralized API function
            toast.success("Task deleted successfully!");
            window.location.reload(); // Refresh task list
        } catch (error) {
            toast.error("Error deleting task.");
        }
    };

    // Handle Status Update
    const handleStatusUpdate = async (newStatus: string) => {
        try {
            await updateTaskStatus(task._id, newStatus); // Using centralized API function
            toast.success("Task status updated!");
            window.location.reload(); // Refresh task list
        } catch (error) {
            toast.error("Error updating task status.");
        }
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toDateString()}</p>
            <p
                className={`text-sm font-semibold ${task.status === "Completed" ? "text-green-500" : "text-yellow-500"
                    }`}
            >
                {task.status}
            </p>
            <button
                className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2"
                onClick={() => handleStatusUpdate("Completed")}
            >
                Mark Completed
            </button>
            <button
                className="bg-red-500 text-white py-1 px-2 rounded-md"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    );
};

export default TaskItem;
