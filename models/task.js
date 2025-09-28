import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        status: { type: String, enum: ["inProgress", "completed", "deleted", "notStarted", "pending", "delay"], default: "notStarted" },
        dueDate: { type: Date },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

taskSchema.index({ title: "text", description: "text" });

// export default mongoose.model("Task", taskSchema);
export default mongoose.models.Task || mongoose.model("Task", taskSchema);

