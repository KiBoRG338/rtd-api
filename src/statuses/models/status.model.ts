import { Document } from 'mongoose';
import { Company } from 'src/companies/models/company.model';

export interface StatusModel extends Document {
    readonly _id: string;
    readonly companyId: Company['_id'];
    readonly title: string;
    readonly position: number;
}