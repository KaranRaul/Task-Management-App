import React from "react";
import TaskItem from "./TaskItem";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

interface TaskListProps {
    tasks: Task[]; // Expecting tasks as a prop
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.length > 0 ? (
                tasks.map((task) => <TaskItem key={task._id} task={task} />)
            ) : (
                <p>No tasks found.</p>
            )}
        </div>
    );
};

export default TaskList;
