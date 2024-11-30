import { useState } from "react";
import Alert from "./Alert";

const TaskManager = () => {
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(
        null
    );

    const handleLogin = () => {
        // Simulate login action
        setAlert({ type: "success", message: "Successfully logged in!" });
    };

    const handleRegister = () => {
        setAlert({ type: "info", message: "Registration successful!" });
    };

    const handleAddTask = () => {
        setAlert({ type: "success", message: "Task added successfully!" });
    };

    const handleDeleteTask = () => {
        setAlert({ type: "danger", message: "Task deleted successfully!" });
    };

    const handleUpdateTask = () => {
        setAlert({ type: "info", message: "Task updated successfully!" });
    };

    const handleCompleteTask = () => {
        setAlert({ type: "success", message: "Task marked as completed!" });
    };

    return (
        <div className="container mx-auto">
            {alert && <Alert type={alert.type} message={alert.message} />}
            {/* Your app content */}
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleAddTask}>Add Task</button>
            <button onClick={handleDeleteTask}>Delete Task</button>
            <button onClick={handleUpdateTask}>Update Task</button>
            <button onClick={handleCompleteTask}>Complete Task</button>
        </div>
    );
};

export default TaskManager;
