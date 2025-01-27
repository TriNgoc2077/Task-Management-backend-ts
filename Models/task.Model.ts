import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
    {
        title: String, 
        status: String,
        content: String,
        timeStart: Date,
        timeFinish: Date,
        createdBy: String,
        participants: Array,
        idParentTask: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date,

    },
    { timestamps: true }
)

const Task = mongoose.model("Task", taskSchema, "tasks");

export default Task;                  //collection tasks