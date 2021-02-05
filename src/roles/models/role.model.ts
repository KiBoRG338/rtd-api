import { Document } from 'mongoose';
import { Company } from 'src/companies/models/company.model';

export interface Role extends Document {
    readonly _id: string;
    readonly title: string;
    readonly companyId: Company['_id'];
}