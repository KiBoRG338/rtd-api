import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StatusModel } from './models/status.model';
import { IAddStatus, IUpdateStatus, IFindOne, IFindAll } from './interfaces/status.interface';

@Injectable()
export class StatusesService {
    constructor(@InjectModel('Status') private readonly StatusModel: Model<StatusModel>) { }

    async findAll({companyId}: IFindAll): Promise<StatusModel[]> {
        return this.StatusModel.find({companyId}).lean();
    }

    async addStatus(data: IAddStatus): Promise<StatusModel> {
        return new this.StatusModel(data).save();
    }

    async deleteStatus(statusId: StatusModel['_id']): Promise<StatusModel> {
        return this.StatusModel.findByIdAndRemove(statusId);
    }

    async updateStatus(statusId: StatusModel['_id'], data: IUpdateStatus): Promise<StatusModel> {
        return this.StatusModel.findByIdAndUpdate(statusId, data, {new: true});
    }

    async findOne(query: IFindOne): Promise<StatusModel> {
        return this.StatusModel.findOne(query);
    }
}
