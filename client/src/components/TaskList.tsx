// TaskList.tsx
import { useState } from 'react';
import TaskItem from './TaskItem';
import Alert from './Alert';
import { TabButton } from './TabButton';
import { CheckCircle, Clock, List, Loader2 } from 'lucide-react';

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

    const statuses = [
        { id: "Pending", label: "Pending", color: "yellow", icon: Clock },
        { id: "In Progress", label: "In Progress", color: "blue", icon: List },
        { id: "Completed", label: "Completed", color: "green", icon: CheckCircle },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            {alert && <Alert type={alert.type as "success" | "danger"} message={alert.message} />}

            <div className="flex flex-wrap gap-2 mb-6">
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

            {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                    <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTasks.map(task => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            setAlert={setAlert}
                            getAllTask={getAllTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskList;