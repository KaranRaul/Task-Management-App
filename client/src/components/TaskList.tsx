import { useState } from 'react';
import TaskItem from './TaskItem';
import Alert from './Alert';

interface Task {
    _id: string; title: string; description: string; status: string; dueDate: string
}


const TaskList = ({ tasks, getAllTask }: { tasks: Task[], getAllTask: any }) => {
    const [selectedStatus, setSelectedStatus] = useState("Pending");
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

    const filteredTasks = tasks.filter(task => task.status === selectedStatus);
    const statuses = ["Pending", "In Progress", "Completed"];

    return (
        <div>
            {alert && <Alert type={alert.type as "success" | "danger"} message={alert.message} />}

            <div className="flex justify-center space-x-6 border-b border-gray-200 mb-4">
                {statuses.map(status => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`py-2 px-4 text-sm font-medium ${selectedStatus === status ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500 hover:text-blue-500"}`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map(task => <TaskItem key={task._id} task={task} setAlert={setAlert} getAllTask={getAllTask} />)
                ) : (
                    <p className="text-gray-500">No tasks in this category.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
