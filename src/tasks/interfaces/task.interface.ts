import { TaskModel } from "../models/task.model";
import { IPagination } from "src/utils/pagination.middleware";

export interface IAddTask {
    readonly projectId: TaskModel['projectId'];
    readonly title: TaskModel['title'];
    readonly description: TaskModel['description'];
    readonly companyId: TaskModel['companyId']
    readonly executorId: TaskModel['executorId'];
    readonly statusId: TaskModel['statusId'];
}

export interface IUpdateTask {
    readonly title: TaskModel['title'];
    readonly description: TaskModel['description'];
}

export interface IUpdateTaskStatus {
    readonly statusId: TaskModel['statusId'];
}

export interface IUpdateTaskExecutor {
    readonly executorId: TaskModel['executorId'];  
}

export interface IFindOne {
    readonly _id?: TaskModel['_id'];
}

export interface IFindAllPagination {
    readonly query: object;
    readonly skip: IPagination['skip'];
    readonly count: IPagination['count'];
}