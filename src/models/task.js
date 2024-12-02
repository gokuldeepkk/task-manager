import {db} from '../db/mongoose.js';

export const Task = db.model('tasks',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});