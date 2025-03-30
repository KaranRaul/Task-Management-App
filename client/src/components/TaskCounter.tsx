import React, { useEffect, useState } from 'react';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
    dueDate: string;
}

const STATUS_TABS = [
    { id: "Pending", label: "Pending", color: "yellow", icon: AlertCircle },
    { id: "In Progress", label: "In Progress", color: "blue", icon: Clock },
    { id: "Completed", label: "Completed", color: "green", icon: CheckCircle },
];

const TaskCounter = ({ tasks }: { tasks: Task[] }) => {
    const [statusCnt, setStatusCnt] = useState<{ [status: string]: number }>({});

    useEffect(() => {
        const counts = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {} as { [status: string]: number });
        setStatusCnt(counts);
    }, [tasks]);

    const countTaskByStatus = (status: string) => {
        return statusCnt[status] || 0;
    };

    // Calculate total tasks
    const totalTasks = tasks.length;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Task Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center shadow-sm border border-blue-100">
                    <div className="text-3xl font-bold text-blue-600 mb-1">{totalTasks}</div>
                    <div className="text-sm text-gray-600 font-medium">Total Tasks</div>
                </div>

                {STATUS_TABS.map(({ id, label, color, icon: Icon }) => (
                    <div key={id} className={`rounded-lg p-4 text-center shadow-sm border ${color === 'yellow' ? 'bg-yellow-50 border-yellow-100' :
                            color === 'blue' ? 'bg-blue-50 border-blue-100' :
                                color === 'green' ? 'bg-green-50 border-green-100' :
                                    'bg-gray-50 border-gray-100'
                        }`}>
                        <div className="flex justify-center mb-2">
                            <Icon className={
                                color === 'yellow' ? 'text-yellow-500' :
                                    color === 'blue' ? 'text-blue-500' :
                                        color === 'green' ? 'text-green-500' :
                                            'text-gray-500'
                            } />
                        </div>
                        <div className={`text-3xl font-bold ${color === 'yellow' ? 'text-yellow-600' :
                                color === 'blue' ? 'text-blue-600' :
                                    color === 'green' ? 'text-green-600' :
                                        'text-gray-600'
                            } mb-1`}>
                            {countTaskByStatus(label)}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">{label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskCounter;