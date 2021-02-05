import { Role } from '../models/role.model';
import { Company } from 'src/companies/models/company.model';

export interface ICreateRole {
    readonly title: Role['title'];
    readonly companyId: Role['companyId'];
}

export interface IUpdateRole {
    readonly title: Role['title'];
}

export interface ICheckRole {
    readonly title?: Role['title'];
    readonly companyId?: Role['companyId'];
}

export interface IFindAll {
    readonly companyId?: Company['_id'];
}