import { UserModel } from '../models/user.model';
import { IPagination } from 'src/utils/pagination.middleware';
import { Company } from 'src/companies/models/company.model';

export interface CreateAdmin {
    readonly email: UserModel['email'];
    readonly username: UserModel['username'];
    readonly firstName: UserModel['firstName'];
    readonly lastName: UserModel['lastName'];
    readonly password: UserModel['password'];
    readonly type: UserModel['type'];
    readonly roleId: UserModel['roleId'];
    readonly status: UserModel['status'];
}

export interface AddMember {
    readonly email: UserModel['email'];
    readonly roleId: UserModel['roleId'];
    readonly companyId: UserModel['companyId'];
    readonly type: UserModel['type'];
}

export interface SignupMember {
    readonly username: UserModel['username'];
    readonly firstName: UserModel['firstName'];
    readonly lastName: UserModel['lastName'];
    readonly password: UserModel['password'];
    readonly status: UserModel['status'];
}

export interface CheckUser {
    readonly _id?: UserModel['_id'];
    readonly email?: UserModel['email'];
    readonly username?: UserModel['username'];
    readonly status?: UserModel['status'];
}

export interface UpdateAdmin {
    readonly roleId: UserModel['roleId'];
    readonly companyId: UserModel['companyId'];
}

export interface IFindAll {
    readonly companyId?: Company['_id'];
}

export interface IFindAllPagination {
    readonly query: object;
    readonly skip: IPagination['skip']; 
    readonly count: IPagination['count']; 
}