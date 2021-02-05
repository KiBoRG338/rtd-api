import { ProjectModel } from '../models/project.model';
import { IPagination } from 'src/utils/pagination.middleware';
import { Company } from 'src/companies/models/company.model';
import { UserModel } from 'src/users/models/user.model';

export interface ICreateProject {
    readonly name: ProjectModel['name'];
    readonly description: ProjectModel['description'];
    readonly companyId: ProjectModel['companyId'];
    readonly memberIds: ProjectModel['memberIds'];
}

export interface IUpdateProject {
    readonly name: ProjectModel['name'];
    readonly description: ProjectModel['description'];  
}

export interface IFindAllPagination {
    readonly query: object;
    readonly skip: IPagination['skip'];
    readonly count: IPagination['count'];
}

export interface IManageMember {
    readonly projectId: ProjectModel['_id'];
    readonly userId: UserModel['_id'];
}

export interface IFindOne {
    readonly _id?: ProjectModel['_id'];
}
