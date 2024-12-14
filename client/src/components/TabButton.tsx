
import { LucideIcon } from 'lucide-react'; // Icon types from lucide-react

// Define the TaskStatus type for strong typing
type TaskStatus = "Pending" | "In Progress" | "Completed";

interface TabButtonProps {
    status: string;
    isActive: boolean;
    icon: LucideIcon; // Icon component to render
    label: string;
    color: string;
    onClick: () => void;
}

export function TabButton({ status, isActive, icon: Icon, label, color, onClick }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isActive
                    ? `bg-${color}-100 text-${color}-800 border-b-2 border-${color}-500`
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
        >
            {/* Render the Icon */}
            <Icon size={20} className={`text-${color}-500`} />
            <span>{label}</span>
        </button>
    );
}
