import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // Centralized API function
import Alert from "../components/Alert"; // Import Alert component

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState<{ type: string; message: string } | null>(
        null
    );
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password }); // Call centralized API
            localStorage.setItem("token", response.token); // Store token
            setAlert({ type: "success", message: "Login successful!" }); // Show success alert
            setTimeout(() => navigate("/"), 2000); // Redirect to homepage after 3 seconds
        } catch (error) {
            setAlert({ type: "danger", message: "Invalid credentials. Please try again!" }); // Show error alert
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {alert && <Alert type={alert.type} message={alert.message} />} {/* Display alert */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-500 hover:underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
