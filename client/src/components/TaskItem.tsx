import React from "react";
import { deleteTask, updateTaskStatus } from "../services/api";
import { AlertCircle, CheckCircle, Clock, Trash2, CircleCheck } from "lucide-react";

export interface Task {
    _id: string;
    title: string;
    description: string;
    status: string // Define as a union type
    dueDate: string;
}

interface TaskItemProps {
    task: Task;
    setAlert: React.Dispatch<React.SetStateAction<{ type: string; message: string } | null>>; // To pass alert to parent
    getAllTask: () => void;
}

const statusIcons: Record<Task["status"], JSX.Element> = {
    Pending: <AlertCircle className="text-yellow-500" />,
    "In Progress": <Clock className="text-blue-500" />,
    Completed: <CheckCircle className="text-green-500" />,
};

const statusColors: Record<Task["status"], string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
};

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

    const handleStatusUpdate = async (newStatus: Task["status"]) => {
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
        <div className="flex justify-between p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toDateString()}</p>
                    <div className="flex items-center gap-2">
                        {statusIcons[task.status]} {/* Safely indexed */}
                        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[task.status]}`}> {/* Safely indexed */}
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div className="grid grid-rows-2">
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={handleDelete}
                    >
                        <Trash2 />
                    </button>
                    <div>
                        {task.status !== "Completed" && (
                            <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => handleStatusUpdate("Completed")}
                            >
                                <CircleCheck />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
