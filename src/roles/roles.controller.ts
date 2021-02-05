import { Controller, Get, Res, HttpStatus, Post, Body, Req, Delete, Put, UseGuards, Param, ForbiddenException, NotFoundException, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDTO, UpdateRoleDTO } from './dto/role.dto';
import { AuthGuard } from 'src/auth/auth.guards';
import { ApiSecurity, ApiNotFoundResponse, ApiUnauthorizedResponse, ApiOkResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ADMIN_TYPE } from 'src/utils/enum.constants';
import { CustomRequest, CustomResponse } from 'src/utils/global.model';
import { PaginationDTO } from 'src/utils/pagination.middleware';

@ApiSecurity('Basic')
@Controller('api/v1/roles')
@UseGuards(AuthGuard([ADMIN_TYPE]))
export class RolesController {
    constructor(
        private RoleService: RolesService, 
    ) {}
    
    @Get()
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'List of roles successfully received.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async getRoles(@Res() res: CustomResponse, @Req() req: CustomRequest, @Query() query: PaginationDTO) {
        const { companyId } = req.user;
        const roles = await this.RoleService.findAll({
             companyId
        });
        res.responseList({ data: roles, pagination: {page: +query.page, count: req.pagination.count} });
    }

    @Post()
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiCreatedResponse({ description: 'Role is created.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async addRole(@Res() res: CustomResponse, @Body() data: CreateRoleDTO) {
        const role = await this.RoleService.createRole({ 
            title: data.title, 
            companyId: data.companyId,
         });

        res.responseEntity({ data: role });
    }

    @Put('/:roleId')
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'Status is updated.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A status with this id not found.'})
    async updateRole(@Res() res: CustomResponse, @Param('roleId') roleId, @Body() data: UpdateRoleDTO) {
        const id = await this.RoleService.findCompany(roleId);
        if (!id) throw new NotFoundException({
            statusCode: 404,
            error: "A role with this id not found."
        });
        const role = await this.RoleService.updateRole(roleId, data);
        res.responseEntity({ data: role });
    }

    @Delete('/:roleId')
    @ApiOperation({ summary: ADMIN_TYPE })
    @ApiOkResponse({ description: 'Role is deleted.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiNotFoundResponse({ description: 'A role with this id not found.'})
    async deleteRole(@Res() res: CustomResponse, @Req() req, @Param('roleId') roleId) {
        const data = await this.RoleService.findCompany(roleId);
        if(!data){
            throw new NotFoundException({
                statusCode: 404,
                error: "A role with this id not found."
            });   
        }
        if(req.user.companyId == data.companyId ) {
            const role = await this.RoleService.deleteRole(roleId);

            res.responseEntity({ data: role });
        } else {
            throw new ForbiddenException();   
        }
    }
}
