import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './models/role.model';
import { ICreateRole, IUpdateRole, ICheckRole, IFindAll } from './interfaces/role.interface';


@Injectable()
export class RolesService {
    constructor(@InjectModel('Role') private readonly RoleModel: Model<Role>) { }

    async findAll({companyId}: IFindAll): Promise<Role[]> {
        const roles = await this.RoleModel.find({companyId}).lean();
        return roles;
    }

    async createRole(data: ICreateRole): Promise<Role> {
        const newRole = new this.RoleModel(data);
        return newRole.save();
    }

    async deleteRole(roleId: Role['_id']): Promise<Role> {
        const deletedRole = await this.RoleModel.findByIdAndRemove(roleId);
        return deletedRole;
    }

    async updateRole(roleId: Role['_id'], data: IUpdateRole): Promise<Role> {
        const updatedRole = await this.RoleModel.findByIdAndUpdate(roleId, data, {new: true});
        return updatedRole;
    }

    async findCompany(roleId: Role['_id']): Promise<Role> {
        const role = await this.RoleModel.findById(roleId);
        return role;
    }

    async findOne(query: ICheckRole): Promise<Role> {
        const role = await this.RoleModel.findOne(query);
        return role;
    }

}
