import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    memberIds: { type: [ mongoose.Schema.Types.ObjectId ], ref: 'User', default: [] },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now }
})  