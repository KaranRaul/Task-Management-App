import { useState } from 'react';
import TaskItem from './TaskItem';
import Alert from './Alert';
import { TabButton } from './TabButton'; // Assuming TabButton is in the same directory or adjust the path accordingly
import { CheckCircle, Clock, List } from 'lucide-react'; // Importing icons

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

const TaskList = ({ tasks, getAllTask }: { tasks: Task[], getAllTask: any }) => {
    const [selectedStatus, setSelectedStatus] = useState("Pending");
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

    const filteredTasks = tasks.filter(task => task.status === selectedStatus);

    // Define statuses with labels, colors, and icons
    const statuses = [
        { id: "Pending", label: "Pending", color: "yellow", icon: Clock },
        { id: "In Progress", label: "In Progress", color: "blue", icon: List },
        { id: "Completed", label: "Completed", color: "green", icon: CheckCircle },
    ];

    return (
        <div>
            {alert && <Alert type={alert.type as "success" | "danger"} message={alert.message} />}

            {/* Task status tabs */}
            <div className="flex justify-center gap-4 border-b border-gray-200 mb-4">
                {statuses.map(({ id, label, color, icon }) => (
                    <TabButton
                        key={id}
                        status={id}
                        isActive={selectedStatus === id}
                        icon={icon}
                        label={label}
                        color={color}
                        onClick={() => setSelectedStatus(id)}
                    />
                ))}
            </div>

            {/* Task list */}
            <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => (
                        <TaskItem key={task._id} task={task} setAlert={setAlert} getAllTask={getAllTask} />
                    ))
                ) : (
                    <p className="text-gray-500">No tasks in this category.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
