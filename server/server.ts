import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('API is running...'));
// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Connect to MongoDB and Start Server
mongoose
    .connect(process.env.MONGO_URI || "", {})
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.error("Database connection error:", error));
