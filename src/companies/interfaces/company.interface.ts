import { Company } from '../models/company.model';
import { UserModel } from 'src/users/models/user.model';

export interface CreateCompany {
    readonly email: Company['email'];
    readonly name: Company['name'];
    readonly website: Company['website'];
    readonly ownerId: Company['name'];
    readonly memberIds: Company['memberIds'];  
}

export interface CheckCompany {
    readonly email?: Company['email'];
    readonly name?: Company['name'];
}

export interface IAddMember {
    readonly companyId: Company['_id'];
    readonly userId: UserModel['_id'];
}