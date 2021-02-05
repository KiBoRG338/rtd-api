import { Document } from 'mongoose';
import { Company } from 'src/companies/models/company.model';
import { UserModel } from 'src/users/models/user.model';
import { ProjectModel } from 'src/projects/models/project.model';
import { StatusModel } from 'src/statuses/models/status.model';

export interface TaskModel extends Document {
    readonly _id: string;
    readonly projectId: ProjectModel['_id'];
    readonly title: string;
    readonly description: string;
    readonly statusId: StatusModel['_id'];
    readonly companyId: Company['_id'];
    readonly executorId: UserModel['_id'];
}