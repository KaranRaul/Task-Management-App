import React from "react";
import { deleteTask, updateTaskStatus } from "../services/api"; // Centralized API functions

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

interface TaskItemProps {
    task: Task;
    setAlert: React.Dispatch<React.SetStateAction<{ type: string; message: string } | null>>; // To pass alert to parent
    getAllTask: any
}


const TaskItem: React.FC<TaskItemProps> = ({ task, setAlert, getAllTask }) => {
    const handleDelete = async () => {
        try {
            await deleteTask(task._id);
            getAllTask(); // API call to delete task
            setAlert({ type: "danger", message: "Task deleted successfully!" }); // Show success alert
        } catch (error) {
            setAlert({ type: "danger", message: "Failed to delete task!" }); // Show error alert
        }
    };

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            await updateTaskStatus(task._id, newStatus); // API call to update task status
            getAllTask();
            setAlert({ type: "success", message: `Task marked as ${newStatus}!` }); // Show success alert
            setTimeout(() => setAlert(null), 4000); // Hide alert after 2 seconds
        } catch (error) {
            setAlert({ type: "danger", message: "Failed to update task status!" }); // Show error alert
            setTimeout(() => setAlert(null), 4000); // Hide alert after 2 seconds
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
