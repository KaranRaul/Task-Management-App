import { LucideIcon } from 'lucide-react';

type TaskStatus = "Pending" | "In Progress" | "Completed";

interface TabButtonProps {
    status: string;
    isActive: boolean;
    icon: LucideIcon;
    label: string;
    color: string;
    onClick: () => void;
}

export function TabButton({ status, isActive, icon: Icon, label, color, onClick }: TabButtonProps) {
    // Map color strings to Tailwind classes to avoid dynamic class generation issues
    const colorMap: Record<string, { bg: string, text: string, border: string, hover: string }> = {
        'yellow': {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            border: 'border-yellow-500',
            hover: 'hover:bg-yellow-50'
        },
        'blue': {
            bg: 'bg-blue-100',
            text: 'text-blue-800',
            border: 'border-blue-500',
            hover: 'hover:bg-blue-50'
        },
        'green': {
            bg: 'bg-green-100',
            text: 'text-green-800',
            border: 'border-green-500',
            hover: 'hover:bg-green-50'
        },
        'red': {
            bg: 'bg-red-100',
            text: 'text-red-800',
            border: 'border-red-500',
            hover: 'hover:bg-red-50'
        }
    };

    const { bg, text, border, hover } = colorMap[color] || colorMap.blue;

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-200 font-medium 
                ${isActive
                    ? `${bg} ${text} border-b-2 ${border} shadow-sm`
                    : `text-gray-600 ${hover} hover:text-gray-800`
                }`}
        >
            <Icon
                size={20}
                className={isActive
                    ? (color === 'yellow' ? 'text-yellow-500' :
                        color === 'blue' ? 'text-blue-500' :
                            color === 'green' ? 'text-green-500' :
                                color === 'red' ? 'text-red-500' : 'text-gray-500')
                    : 'text-gray-400'
                }
            />
            <span>{label}</span>
        </button>
    );
}