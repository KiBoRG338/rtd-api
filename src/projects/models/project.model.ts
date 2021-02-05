import { Document } from 'mongoose';
import { Company } from 'src/companies/models/company.model';

export interface ProjectModel extends Document {
    readonly _id: string;
    readonly name: string;
    readonly description: string;
    readonly companyId: Company['_id'];
    readonly memberIds: [string];
}