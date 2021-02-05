import { Controller, Get, Res, HttpStatus, Post, Body, Req, Delete, Put, UseGuards, Param, ForbiddenException, NotFoundException, Query, forwardRef, Inject, Patch, InternalServerErrorException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AddTaskDTO, UpdateTaskDTO, UpdateTaskStatusDTO, UpdateTaskExecutorDTO } from './dto/task.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { ApiCreatedResponse, ApiUnauthorizedResponse, ApiOkResponse, ApiNotFoundResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger';
import { ADMIN_TYPE, MEMBER_TYPE, NEW_STATUS } from 'src/utils/enum.constants';
import { CustomRequest, CustomResponse } from 'src/utils/global.model';
import { PaginationDTO } from 'src/utils/pagination.middleware';
import { ProjectsService } from 'src/projects/projects.service';
import { StatusesService } from 'src/statuses/statuses.service';
import { UsersService } from 'src/users/users.service';

@Controller('api/v1/tasks')
export class TasksController {
    constructor(
        private TaskService: TasksService, 
        @Inject(forwardRef(() => ProjectsService)) private ProjectService: ProjectsService,
        @Inject(forwardRef(() => StatusesService)) private StatusService: StatusesService,
        @Inject(forwardRef(() => UsersService)) private UserService: UsersService
    ) {}
    
    @Get()
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })    
    @ApiOkResponse({ description: 'List of tasks successfully received.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async getTasks(@Res() res: CustomResponse, @Req() req: CustomRequest, @Query() query: PaginationDTO) {
        try{
            const { companyId } = req.user;
            const tasks = await this.TaskService.findAllPagination({
                skip: req.pagination.skip,
                count: req.pagination.count,
                query: { companyId }
            });

            res.responseList({ data: tasks, pagination: {page: +query.page, count: req.pagination.count} });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }


    @Post()
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })    
    @ApiCreatedResponse({ description: 'User is created.'})
    @ApiForbiddenResponse()
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async addTask(@Req() req: CustomRequest, @Res() res: CustomResponse, @Body() data: AddTaskDTO) {
        try{
            const { companyId, userId } = req.user;
            const { projectId, title, description } = data;
            const project = await this.ProjectService.findOne({ _id: projectId });
            const status = await this.StatusService.findOne({ companyId: companyId, title: NEW_STATUS });

            if(!project){
                throw new NotFoundException({
                    status: 404,
                    description: 'A project not found.'
                });
            }
            if(companyId != project.companyId){
                throw new ForbiddenException();
            }

            const task = await this.TaskService.addTask({ 
                projectId: projectId,
                title: title, 
                description: description,
                companyId: companyId,
                executorId: userId,
                statusId: status._id
            });

            res.responseEntity({ data: task });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Patch('/:taskId')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })    
    @ApiOkResponse({ description: 'Task is updated.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse()
    @ApiNotFoundResponse({ description: 'A task with this id not found.'})
    async updateTask(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param('taskId') taskId, @Body() data: UpdateTaskDTO) {
        try{
            const { companyId } = req.user;
            const task = await this.TaskService.findOne({_id: taskId});
            
            if (!task) throw new NotFoundException({
                statusCode: 404,
                error: "A task with this id not found."
            });

            if(companyId != task.companyId){
                throw new ForbiddenException();
            }
            
            const updatedTask = await this.TaskService.updateTask(taskId, data);
            res.responseEntity({ data: updatedTask });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Put('/:taskId/status/:statusId')
    @UseGuards(AuthGuard([MEMBER_TYPE, ADMIN_TYPE]))
    @ApiOperation({ summary: `${ADMIN_TYPE}, ${MEMBER_TYPE}` })    
    @ApiOkResponse({ description: 'Task status is updated.'})
    @ApiForbiddenResponse()
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A task with this id not found.'})
    @ApiNotFoundResponse({ description: 'A status with this id not found.'})
    async updateTaskStatus(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param() params: UpdateTaskStatusDTO) {
        try{       
            const { companyId } = req.user;
            const { taskId, statusId } = params;
            const task = await this.TaskService.findOne({_id: taskId});
            const status = await this.StatusService.findOne({_id: statusId});
            if (!task) throw new NotFoundException({
                statusCode: 404,
                error: "A task with this id not found."
            });

            if (!status) throw new NotFoundException({
                statusCode: 404,
                error: "A status with this id not found."
            });

            if(companyId != task.companyId || companyId != status.companyId){
                throw new ForbiddenException();
            }

            const updatedTask = await this.TaskService.updateTaskStatus(taskId, {statusId: statusId});
            res.responseEntity({ data: updatedTask });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Put('/:taskId/executor/:userId')
    @UseGuards(AuthGuard([MEMBER_TYPE, ADMIN_TYPE]))
    @ApiOperation({ summary: `${ADMIN_TYPE}, ${MEMBER_TYPE}` })    
    @ApiOkResponse({ description: 'Task executor is updated.'})
    @ApiForbiddenResponse()
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A task with this id not found.'})
    @ApiNotFoundResponse({ description: 'A user with this id not found.'})
    async updateTaskExecutor(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param() params: UpdateTaskExecutorDTO) {
        try{       
            const { companyId } = req.user;
            const { taskId, userId } = params;
            const task = await this.TaskService.findOne({_id: taskId});
            const user = await this.UserService.findOne({_id: userId});
            if (!task) throw new NotFoundException({
                statusCode: 404,
                error: "A task with this id not found."
            });

            if (!user) throw new NotFoundException({
                statusCode: 404,
                error: "A user with this id not found."
            });

            if(companyId != task.companyId || companyId != user.companyId){
                throw new ForbiddenException();
            }

            const updatedTask = await this.TaskService.updateTaskExecutor(taskId, {executorId: userId});
            res.responseEntity({ data: updatedTask });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Delete('/:taskId')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'Task is deleted.'})
    @ApiForbiddenResponse()
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A task with this id not found.'})
    async deleteTask(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param('taskId') taskId) {
        try{
            const { companyId } = req.user;
            const task = await this.TaskService.findOne({ _id: taskId });

            if(!task){
                throw new NotFoundException({
                    statusCode: 404,
                    error: "A task with this id not found."
                });   
            }

            if(companyId != task.companyId) {
                throw new ForbiddenException();   
            }

            const removedTask = await this.TaskService.deleteTask(taskId);

            res.responseEntity({ data: removedTask });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }
}
