import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Task } from "../components/TaskItem"; // Task type import if needed
import { fetchTasks } from "../services/api";
import TaskCounter from "../components/TaskCounter";

const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const getAllTask = async () => {
        const test = await fetchTasks();
        setTasks(test);
    }
    useEffect(() => {
        getAllTask();
    }, []);


    // Callback function to add a new task to the list
    const addTask = (newTask: Task) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Pass addTask to TaskForm */}
                <TaskForm addTask={addTask} />
                <TaskCounter tasks={tasks} />
                <h2 className="text-xl font-bold mt-8 mb-4">Task List</h2>
                {/* Pass tasks to TaskList */}
                <TaskList tasks={tasks} getAllTask={getAllTask} />
            </div>
        </div>
    );
};

export default Dashboard;
