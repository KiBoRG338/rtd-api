import { Document } from 'mongoose';
import { ADMIN_TYPE, MEMBER_TYPE } from '../../utils/enum.constants';
import { Company } from 'src/companies/models/company.model';
import { Role } from 'src/roles/models/role.model';

export interface UserModel extends Document {
    readonly _id: string;
    readonly email: string;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly password: string;
    readonly roleId: Role['_id']; // custom role
    readonly companyId: Company['_id'];
    readonly status: number;
    readonly type: typeof ADMIN_TYPE | typeof MEMBER_TYPE; //  type (role) user on platform
}