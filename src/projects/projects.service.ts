import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProjectModel } from './models/project.model';
import { ICreateProject, IUpdateProject, IFindAllPagination, IManageMember, IFindOne } from './interfaces/project.interface';

@Injectable()
export class ProjectsService {
    
    constructor(@InjectModel('Project') private readonly ProjectModel: Model<ProjectModel>) { }

    async findAllPagination({ skip, count, query }: IFindAllPagination): Promise<ProjectModel[]> {
        const projects = await this.ProjectModel.find(query).lean().skip(skip).limit(count);
        return projects;
    }

    async createProject(data: ICreateProject): Promise<ProjectModel> {
        const newProject = new this.ProjectModel(data);
        return newProject.save();
    }

    async deleteProject(projectId: ProjectModel['_id']): Promise<ProjectModel> {
        const deletedProject = await this.ProjectModel.findByIdAndRemove(projectId);
        return deletedProject;
    }

    async updateProject(projectId: ProjectModel['_id'], data: IUpdateProject): Promise<ProjectModel> {
        const updatedProject = await this.ProjectModel.findOneAndUpdate({_id: projectId}, data, {new: true});
        return updatedProject;
    }

    async findOne(query: IFindOne): Promise<ProjectModel> {
        const project = await this.ProjectModel.findOne(query);
        return project;
    }

    async addMember(data: IManageMember): Promise<ProjectModel>{
        const updatedProject = await this.ProjectModel.findByIdAndUpdate(data.projectId, { $push: { memberIds: data.userId }}, {new: true});
        return updatedProject;
    }

    async removeMember(data: IManageMember): Promise<ProjectModel>{
        const updatedProject = await this.ProjectModel.findByIdAndUpdate(data.projectId, { $pull: { memberIds: data.userId }}, {new: true});
        return updatedProject;
    }
}