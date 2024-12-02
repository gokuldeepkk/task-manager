import mongoose from 'mongoose';

const connectionUrl = "mongodb://127.0.0.1:27017/task-manager-api";

export const db = mongoose.createConnection(connectionUrl);
