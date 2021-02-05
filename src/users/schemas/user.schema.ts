import * as mongoose from 'mongoose';
import { ADMIN_TYPE, MEMBER_TYPE, DISABLED_STATUS, ENABLED_STATUS } from '../../utils/enum.constants';

export const UserSchema = new mongoose.Schema({
     email: { type: String, required: true, uniq: true },
     username: { type: String, uniq: true },
     firstName: { type: String },
     lastName: { type: String },
     password: { type: String },
     roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', default: null, required: true },
     type: { type: String, enum: [ ADMIN_TYPE, MEMBER_TYPE ] },
     status: { type: Number, enum: [ DISABLED_STATUS, ENABLED_STATUS ], default: null },
     companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null, required: true }
});