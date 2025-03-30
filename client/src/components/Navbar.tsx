// Navbar.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { KanbanSquare, LogOut, LogIn, UserPlus } from "lucide-react";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <KanbanSquare className="h-8 w-8 mr-2" />
                        <h1 className="text-xl font-bold">
                            <Link to="/" className="hover:text-blue-200 transition-colors">
                                TaskFlow
                            </Link>
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-lg transition-colors"
                                >
                                    <LogIn size={18} />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg transition-colors"
                                >
                                    <UserPlus size={18} />
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;