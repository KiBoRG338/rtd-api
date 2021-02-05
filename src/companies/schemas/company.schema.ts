import * as mongoose from 'mongoose';

export const CompanySchema = new mongoose.Schema({
     email: { type: String, required: true },
     name: { type: String, required: true },
     website: { type: String, required: true },
     memberIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', required: true },
     ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});