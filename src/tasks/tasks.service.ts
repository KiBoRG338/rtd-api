import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TaskModel } from './models/task.model';
import { IAddTask, IUpdateTask, IUpdateTaskStatus, IFindOne, IFindAllPagination, IUpdateTaskExecutor } from './interfaces/task.interface';

@Injectable()
export class TasksService {

    constructor(@InjectModel('Task') private readonly TaskModel: Model<TaskModel>) { }

    async findAllPagination({skip, count, query}: IFindAllPagination): Promise<TaskModel[]> {
        return this.TaskModel.find(query).lean().skip(skip).limit(count);
    }

    async addTask(data: IAddTask): Promise<TaskModel> {
        return new this.TaskModel(data).save();
    }

    async deleteTask(taskId: TaskModel['_id']): Promise<TaskModel> {
        return this.TaskModel.findByIdAndRemove(taskId);
    }

    async updateTask(taskId: TaskModel['_id'], data: IUpdateTask ): Promise<TaskModel> {
        return this.TaskModel.findByIdAndUpdate(taskId, data, {new: true});
    }

    async updateTaskStatus(taskId: TaskModel['_id'], data: IUpdateTaskStatus ): Promise<TaskModel> {
        return this.TaskModel.findByIdAndUpdate(taskId, data, {new: true});
    }

    async updateTaskExecutor(taskId: TaskModel['_id'], data: IUpdateTaskExecutor ): Promise<TaskModel> {
        return this.TaskModel.findByIdAndUpdate(taskId, data, {new: true});
    }

    async findOne(query: IFindOne): Promise<TaskModel> {
        return this.TaskModel.findOne(query);
    }
}
