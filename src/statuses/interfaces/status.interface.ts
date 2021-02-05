import { StatusModel } from "../models/status.model";
import { Company } from "src/companies/models/company.model";
import { IPagination } from "src/utils/pagination.middleware";

export interface IAddStatus {
    readonly companyId: StatusModel['companyId'];
    readonly title: StatusModel['title'];
    readonly position: StatusModel['position'];
}

export interface IUpdateStatus {
    readonly title: StatusModel['title'];
    readonly position: StatusModel['position'];
}

export interface IFindOne {
    readonly _id?: Company['_id'];
    readonly title?: StatusModel['title'];
    readonly companyId?: StatusModel['companyId'];
}

export interface IFindAll {
    readonly companyId?: Company['_id'];
}