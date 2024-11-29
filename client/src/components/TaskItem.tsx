import React from "react";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-bold">{task.title}</h3>
            <p className="text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toDateString()}</p>
            <p className={`text-sm font-semibold ${task.status === "Completed" ? "text-green-500" : "text-yellow-500"}`}>
                {task.status}
            </p>
        </div>
    );
};

export default TaskItem;
