import React, { useState } from "react";
import TaskItem from "./TaskItem";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

interface TaskListProps {
    tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const [selectedStatus, setSelectedStatus] = useState("Pending");

    // Filter tasks based on the selected status
    const filteredTasks = tasks.filter((task) => task.status === selectedStatus);

    const statuses = ["Pending", "In Progress", "Completed"];

    return (
        <div>
            {/* Status Tabs */}
            <div className="flex justify-center space-x-6 border-b border-gray-200">
                {statuses.map((status) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`py-2 px-4 text-sm font-medium ${selectedStatus === status
                                ? "text-blue-500 border-b-2 border-blue-500"
                                : "text-gray-500 hover:text-blue-500"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Task Items */}
            <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => <TaskItem key={task._id} task={task} />)
                ) : (
                    <p className="text-gray-500">No tasks in this category.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
