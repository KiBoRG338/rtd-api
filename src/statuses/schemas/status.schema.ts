import * as mongoose from 'mongoose';
import { NEW_STATUS, IN_PROGRESS_STATUS, DONE_STATUS } from 'src/utils/enum.constants';

export const StatusSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    title: { type: String, enum: [NEW_STATUS, IN_PROGRESS_STATUS, DONE_STATUS], required: true },
    position: { type: Number, required: true},
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now }
})  