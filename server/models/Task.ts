import mongoose, { Document } from "mongoose";

interface ITask extends Document {
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    file?: string;
}

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
    dueDate: { type: Date, required: true },
    file: { type: String },
});

export default mongoose.model<ITask>("Task", TaskSchema);
