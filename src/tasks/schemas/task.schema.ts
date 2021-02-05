import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
    projectId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: ""},
    statusId: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    executorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now }
})  