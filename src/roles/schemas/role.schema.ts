import * as mongoose from 'mongoose';
import { PM_ROLE, DEVELOPER_ROLE, QA_ROLE } from 'src/utils/enum.constants';

export const RoleSchema = new mongoose.Schema({
    title: { type: String, enum: [ PM_ROLE, DEVELOPER_ROLE, QA_ROLE], required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    createdAt: { type: mongoose.Schema.Types.Date, default: Date.now }
})  