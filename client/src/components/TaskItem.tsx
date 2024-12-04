import React, { useState } from "react";
import { deleteTask, updateTaskStatus } from "../services/api";

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

const TaskItem: React.FC<TaskItemProps> = ({ task, setAlert, getAllTask }) => {
    const [showDialog, setShowDialog] = useState(false); // State to toggle dialog visibility

    const handleDelete = async () => {
        try {
            await deleteTask(task._id); // API call to delete task
            getAllTask();
            setAlert({ type: "danger", message: "Task deleted successfully!" }); // Show success alert
        } catch (error) {
            setAlert({ type: "danger", message: "Failed to delete task!" }); // Show error alert
        } finally {
            setShowDialog(false); // Close the dialog
        }
    };

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            await updateTaskStatus(task._id, newStatus); // API call to update task status
            getAllTask();
            setAlert({ type: "success", message: `Task marked as ${newStatus}!` }); // Show success alert
            setTimeout(() => setAlert(null), 4000);
        } catch (error) {
            setAlert({ type: "danger", message: "Failed to update task status!" }); // Show error alert
            setTimeout(() => setAlert(null), 4000);
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
                onClick={() => setShowDialog(true)} // Open the dialog
            >
                Delete
            </button>

            {/* Confirmation Dialog */}
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-md p-6 shadow-md w-80">
                        <h4 className="text-lg font-semibold mb-4">Confirm Delete</h4>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete the task <strong>{task.title}</strong>?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="py-1 px-3 bg-gray-300 rounded-md text-gray-700"
                                onClick={() => setShowDialog(false)} // Close the dialog
                            >
                                Cancel
                            </button>
                            <button
                                className="py-1 px-3 bg-red-500 text-white rounded-md"
                                onClick={handleDelete} // Confirm delete
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
