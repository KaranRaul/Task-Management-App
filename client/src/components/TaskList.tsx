import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/tasks");
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
