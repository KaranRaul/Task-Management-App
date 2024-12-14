import { Divide } from 'lucide-react';
import React, { useEffect, useState } from 'react'

interface Task {
    _id: string; title: string; description: string; status: string; dueDate: string
}

// type status = "Pending" | "In Progress" | "Completed";

const STATUS_TABS = [
    { id: "Pending", label: "Pending", color: "red" },
    { id: "In Progress", label: "In Progress", color: "yellow" },
    { id: "Completed", label: "Completed", color: "green" },
];

const TaskCounter = ({ tasks }: { tasks: Task[] }) => {

    const [statusCnt, setStatusCnt] = useState<{ [status: string]: number }>({});
    useEffect(() => {
        const counts = tasks.reduce((acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        }, {} as { [status: string]: number });
        setStatusCnt(counts);
    }, [tasks])

    const countTaskByStatus = (status: string) => {
        return statusCnt[status] || 0;
    }
    return (
        <div className="flex gap-4 mb-6">
            {STATUS_TABS.map(({ id, label, color }) => (
                <div key={id} className="text-center">
                    <div className={`text-2xl font-bold text-${color}-500`}>
                        {countTaskByStatus(label)}
                    </div>
                    <div className="text-sm text-gray-600">{label}</div>
                </div>
            ))}
        </div>
    );
}

export default TaskCounter