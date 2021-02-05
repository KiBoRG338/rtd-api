import { Injectable, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserModel } from './models/user.model';
import { CreateAdmin, AddMember, SignupMember, CheckUser, UpdateAdmin, IFindAll, IFindAllPagination } from './interfaces/user.interface';
import { AuthDTO } from './dto/user.dto';
import { IPagination } from 'src/utils/pagination.middleware';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly UserModel: Model<UserModel>) { }

    async createAdmin(data: CreateAdmin): Promise<UserModel> {
        const newAdmin = new this.UserModel(data);
        return newAdmin.save();
    }

    async updateAdmin(id: UserModel['_id'], data: UpdateAdmin): Promise<UserModel> {
        const updatedAdmin = await this.UserModel.findByIdAndUpdate(id, data, {new: true});
        return updatedAdmin;
    }

    async findAllPagination({skip, count, query }: IFindAllPagination): Promise<UserModel[]> {
        return this.UserModel.find(query).lean().limit(count).skip(skip);
    }

    async findAll({companyId}: IFindAll): Promise<UserModel[]> {
        return this.UserModel.find({companyId}).lean();
    }

    async getByCredentials(data: AuthDTO): Promise<UserModel> {
        return this.UserModel.findOne({ email: data.email, password: data.password }).lean();
    }

    async addMember(data: AddMember): Promise<UserModel> {
        const addedMember = new this.UserModel(data);
        return addedMember.save();
    }

    async signupMember(id: UserModel['_id'], data: SignupMember): Promise<UserModel> {
        const updatedMember = await this.UserModel.findByIdAndUpdate(id, data, {new: true});
        return updatedMember;
    }

    async findOne(query: CheckUser){
        const user = await this.UserModel.findOne(query);
        return user;
    }

}
