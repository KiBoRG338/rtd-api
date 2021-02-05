import { Controller, Get, Req, Res, UseGuards, Inject, forwardRef, Query } from '@nestjs/common';
import { ApiSecurity, ApiOperation, ApiOkResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { CustomRequest, CustomResponse } from 'src/utils/global.model';
import { AuthGuard } from 'src/auth/auth.guards';
import { UsersService } from 'src/users/users.service';
import { MEMBER_TYPE, ADMIN_TYPE } from 'src/utils/enum.constants';
import { RolesService } from 'src/roles/roles.service';
import { StatusesService } from 'src/statuses/statuses.service';

@ApiSecurity('basic')
@Controller('api/v1/platform')
@UseGuards(AuthGuard([ MEMBER_TYPE, ADMIN_TYPE ]))
export class PlatformController {
    constructor(
        @Inject(forwardRef(() => UsersService)) private UserService: UsersService,
        @Inject(forwardRef(() => RolesService)) private RoleService: RolesService,
        @Inject(forwardRef(() => StatusesService)) private StatusService: StatusesService,
    ){}

    @Get()
    @ApiOperation({ summary: '[ ]' })
    @ApiOkResponse({ description: 'Got info.'})
    @ApiForbiddenResponse({ description: 'Unauthorized.'})
    async getPublicMembers(@Req() req: CustomRequest, @Res() res: CustomResponse){
        const { companyId } = req.user;
        const fullMembers = await this.UserService.findAll({
            companyId
        });
        const members = fullMembers.map(user => ({id: user._id, username: user.username, firstName: user.firstName, lastName: user.lastName}));
        const roles = await this.RoleService.findAll({
            companyId
        });
        const statuses = await this.StatusService.findAll({
            companyId
        });
        const result = {members, roles, statuses};
            
        res.responseEntity({ data: result });
    }
}
