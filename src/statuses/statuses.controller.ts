import { Controller, Get, Res, Post, Body, Req, Delete, Put, UseGuards, Param, ForbiddenException, NotFoundException, Query, InternalServerErrorException } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { AddStatusDTO, UpdateStatusDTO } from './dto/status.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { ADMIN_TYPE } from 'src/utils/enum.constants';
import { CustomResponse, CustomRequest } from 'src/utils/global.model';
import { PaginationDTO } from 'src/utils/pagination.middleware';

@ApiSecurity('Basic')
@Controller('api/v1/statuses')
export class StatusesController {
    constructor(
        private StatusService: StatusesService, 
    ) {}
    
    @Get()
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })    
    @ApiOkResponse({ description: 'List of statuses successfully received.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async getStatuses(@Res() res: CustomResponse, @Req() req: CustomRequest) {
        const { companyId } = req.user;
        try{
            const statuses = await this.StatusService.findAll({
                companyId
            });
            res.responseEntity({ data: statuses });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Post()
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })    
    @ApiCreatedResponse({ description: 'Status is created.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async addStatus(@Req() req: CustomRequest, @Res() res: CustomResponse, @Body() data: AddStatusDTO) {
        const { companyId } = req.user;
        try{
            const status = await this.StatusService.addStatus({ 
                companyId: companyId,
                title: data.title,
                position: data.position,
            });

            res.responseEntity({ data: status });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Put('/:statusId')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'Status is updated.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A status with this id not found.'})
    async updateStatus(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param('statusId') statusId, @Body() data: UpdateStatusDTO) {
        try{
            const { companyId } = req.user;
            const status = await this.StatusService.findOne({_id: statusId});
            if (!status) throw new NotFoundException({
                statusCode: 404,
                error: "A status with this id not found."
            });
            if(companyId != status.companyId ) {
                throw new ForbiddenException();  
            }

            const updatedStatus = await this.StatusService.updateStatus(statusId, data);

            res.responseEntity({ data: updatedStatus });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }

    @Delete('/:statusId')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'Status is deleted.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A status with this id not found.'})
    async deleteStatus(@Req() req: CustomRequest, @Res() res: CustomResponse, @Param('statusId') statusId) {
        try{
            const { companyId } = req.user;
            const status = await this.StatusService.findOne({_id: statusId});

            if(!status){
                throw new NotFoundException({
                    statusCode: 404,
                    error: "A status with this id not found."
                });   
            }
            if(companyId != status.companyId ) {
                throw new ForbiddenException();  
            }

            const removedStatus = await this.StatusService.deleteStatus(statusId);

            res.responseEntity({ data: removedStatus });
        }catch(e){
            console.log(e);
            res.responseException({message: e.response, status: e.status});
        }
    }
}
