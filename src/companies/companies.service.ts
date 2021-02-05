import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCompany, CheckCompany, IAddMember } from './interfaces/company.interface';
import { Company } from './models/company.model';


@Injectable()
export class CompaniesService {

    constructor(@InjectModel('Company') private readonly CompanyModel: Model<Company>) { }

    async getCompanies(): Promise<Company[]> {
        const users = await this.CompanyModel.find().lean();
        return users;
    }

    async createCompany(data: CreateCompany): Promise<Company> {
        const newCompany = new this.CompanyModel(data);
        return newCompany.save();
    }

    async addMember(data: IAddMember): Promise<Company>{
        const updatedCompany = await this.CompanyModel.findByIdAndUpdate(data.companyId, { $push: { memberIds: data.userId }}, {new: true});
        return updatedCompany;
    }

    async findOne(query: CheckCompany){
        const user = await this.CompanyModel.findOne(query);
        return user;
    }

}