// backend/models/Task.js
const mongoose = require('mongoose');
const { STATUSES_OBJ, CHECKBOX_OPTIONS } = require('../helper/constants');

const TaskSchema = new mongoose.Schema({
    // Corresponds to ITask.name
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    // Corresponds to ITask.priority
    priority: {
        type: String,
        enum: CHECKBOX_OPTIONS, // 'high', 'medium', 'low'
        required: true
    },
    // Corresponds to ITask.dueDate
    dueDate: {
        type: String, // Stored as string 'yyyy-mm-dd'
        required: true
    },
    // Status for client-side column grouping
    status: {
        type: String,
        enum: [STATUSES_OBJ.ADDED, STATUSES_OBJ.STARTED, STATUSES_OBJ.COMPLETED],
        default: STATUSES_OBJ.ADDED
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Map MongoDB's _id to the frontend's expected 'id' field
TaskSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
    }
});

module.exports = mongoose.model('Task', TaskSchema);