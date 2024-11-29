import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">Task Manager</Link>
                </h1>
                <div>
                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="bg-white text-blue-500 py-2 px-4 rounded-md mr-2"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-blue-500 py-2 px-4 rounded-md"
                            >
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 py-2 px-4 rounded-md"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
