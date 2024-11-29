import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard: React.FC = () => {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <TaskForm />
                <h2 className="text-xl font-bold mt-8 mb-4">Task List</h2>
                <TaskList />
            </div>
        </div>
    );
};

export default Dashboard;
