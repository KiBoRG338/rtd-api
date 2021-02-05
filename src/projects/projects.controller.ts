import { Controller, Get, Res, Post, Body, Req, Delete, UseGuards, Param, ForbiddenException, NotFoundException, Query, Inject, forwardRef, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { AuthGuard } from 'src/auth/auth.guards';
import { CreateProjectDTO, UpdateProjectDTO, ManageMemberDTO } from './dto/project.dto';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiForbiddenResponse } from '@nestjs/swagger';
import { ADMIN_TYPE, MEMBER_TYPE } from 'src/utils/enum.constants';
import { CustomRequest, CustomResponse } from 'src/utils/global.model';
import { PaginationDTO } from 'src/utils/pagination.middleware';
import { UsersService } from 'src/users/users.service';

@ApiSecurity('Basic')
@Controller('api/v1/projects')
export class ProjectsController {
    constructor(
        private ProjectService: ProjectsService, 
        @Inject(forwardRef(() => UsersService)) private UserService: UsersService
    ) {}
    
    @Get()
    @UseGuards(AuthGuard([ADMIN_TYPE, MEMBER_TYPE]))
    @ApiOperation({ summary: `${ADMIN_TYPE}, ${MEMBER_TYPE}`})
    @ApiOkResponse({ description: 'List of projects successfully received.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async getProjects(@Res() res: CustomResponse, @Req() req: CustomRequest, @Query() query: PaginationDTO) {
        try{
            const { companyId } = req.user;
            const { skip, count } = req.pagination;
            if(companyId == null){
                throw new ForbiddenException();
            }
            const projects = await this.ProjectService.findAllPagination({
                skip: skip,
                count: count,
                query: { companyId } 
            });

            res.responseList({ data: projects, pagination: {page: +query.page, count: req.pagination.count} });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Post()
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiCreatedResponse({ description: 'Project is created.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async addProject(@Req() req: CustomRequest, @Res() res: CustomResponse, @Body() data: CreateProjectDTO) {
        try{
            const project = await this.ProjectService.createProject({
                name: data.name,
                description: data.description,
                companyId: req.user.companyId,
                memberIds: [req.user.userId]
            });

            res.responseEntity({ data: project });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Post('/:projectId/members/:userId')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiCreatedResponse({ description: 'Member is created.'})
    @ApiForbiddenResponse()
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async addMember(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param() params: ManageMemberDTO) {
        try{
            const { companyId } = req.user;
            const { projectId, userId } = params;
            const project = await this.ProjectService.findOne({_id: projectId});
            const user = await this.UserService.findOne({_id: userId});

            if(companyId != project.companyId || companyId != user.companyId){
                throw new ForbiddenException();
            }

            const addedMember = await this.ProjectService.addMember({
                projectId: projectId,
                userId: userId,
            });

            res.responseEntity({ data: addedMember });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Delete('/:projectId/members/:userId')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'Member is removed.'})
    @ApiForbiddenResponse()
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async removeMember(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param() params: ManageMemberDTO) {
        try{
            const { companyId } = req.user;
            const { projectId, userId } = params;
            const project = await this.ProjectService.findOne({_id: projectId});
            const user = await this.UserService.findOne({_id: userId});

            if(companyId != project.companyId || companyId != user.companyId){
                throw new ForbiddenException();
            }

            const removedMember = await this.ProjectService.removeMember({
                projectId: projectId,
                userId: userId,
            });

            res.responseEntity({ data: removedMember });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Patch('/:projectId')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'Project is updated.'})
    @ApiForbiddenResponse()
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A project with this id not found.'})
    async updateProject(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param('projectId') projectId, @Body() data: UpdateProjectDTO) {
        try{
            const { companyId } = req.user;
            
            const project = await this.ProjectService.findOne({_id: projectId});
            if(!project){
                throw new NotFoundException({
                    statusCode: 404,
                    error: "A project with this id not found."
                });   
            }

            if(companyId != project.companyId) {
                throw new ForbiddenException();   
            }
            
            const updatedProject = await this.ProjectService.updateProject(projectId, {
                name: data.name,
                description: data.description
            });

            res.responseEntity({ data: updatedProject });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Delete('/:projectId')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'Project is deleted.'})
    @ApiForbiddenResponse()
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A project with this id not found.'})
    async removeProject(@Res() res: CustomResponse, @Req() req: CustomRequest, @Param('projectId') projectId) {
        try{
            const { companyId } = req.user;

            const project = await this.ProjectService.findOne({_id: projectId});

            if(!project){
                throw new NotFoundException({
                    statusCode: 404,
                    error: "A project with this id not found."
                });   
            }

            if(companyId != project.companyId) {
                throw new ForbiddenException();   
            }


            const removedProject = await this.ProjectService.deleteProject(projectId);

            res.responseEntity({ data: removedProject });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }
}
