import mongoose, { Document } from "mongoose";

interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    file?: string;
    userId: mongoose.Types.ObjectId; // Reference to the user
}

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    dueDate: { type: Date, required: true },
    file: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to user
});

export default mongoose.model<ITask>("Task", TaskSchema);
