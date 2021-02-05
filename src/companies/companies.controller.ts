import { Controller, Res, Post, Body, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthService } from '../auth/auth.service';
import { CreateCompanyDTO } from './dto/company.dto';
import { ApiSecurity, ApiCreatedResponse, ApiUnauthorizedResponse, ApiOperation } from '@nestjs/swagger';
import { CustomResponse } from 'src/utils/global.model';
import { getDefaultCompanyStatuses, getDefaultCompanyRoles } from 'src/utils/helper.function';
import { ADMIN_TYPE, PM_ROLE } from 'src/utils/enum.constants';
import { StatusesService } from 'src/statuses/statuses.service';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';


@ApiSecurity('Basic')
@Controller('api/v1/companies')
export class CompaniesController {
    constructor(
        private CompanyService: CompaniesService, 
        @Inject(forwardRef(() => AuthService)) private AuthService: AuthService,
        @Inject(forwardRef(() => StatusesService)) private StatusService: StatusesService,
        @Inject(forwardRef(() => RolesService)) private RoleService: RolesService,
        @Inject(forwardRef(() => UsersService)) private UserService: UsersService
    ) {}

    @Post()
    @ApiOperation({ summary: '[ ]' })
    @ApiCreatedResponse({ description: 'Company is created.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async createCompany(@Res() res: CustomResponse, @Body() data: CreateCompanyDTO) {
    const email = await this.CompanyService.findOne({email: data.email});
    const name = await this.CompanyService.findOne({name: data.name});
    if(email) {
        throw new NotFoundException({
            statusCode: 404,
            error: "A company with this email is already registered."
        });
    }
    if(name) {
        throw new NotFoundException({
            statusCode: 404,
            error: "A company with this name is already registered."
        });
    }
        const company = await this.CompanyService.createCompany({ 
            email: data.email, 
            name: data.name, 
            website: data.website, 
            ownerId: data.userId,
            memberIds: [data.userId]
        });


        const statuses = getDefaultCompanyStatuses({companyId: company._id});
        const roles = getDefaultCompanyRoles({companyId: company._id});

        for(let i = 0; i < roles.length; i++){
           await this.RoleService.createRole({ 
                title: roles[i].title, 
                companyId: roles[i].companyId,
             });
        }
        for(let i = 0; i < statuses.length; i++){
            await this.StatusService.addStatus({ 
                title: statuses[i].title,
                companyId: statuses[i].companyId,
                position: i
            });
        }

        const role = await this.RoleService.findOne({title: PM_ROLE, companyId: company._id});

        const updateAdmin = await this.UserService.updateAdmin(data.userId, {
            roleId: role._id,
            companyId: company._id,
        })

        const result = await this.AuthService.createToken({ 
            userId: data.userId, 
            roleId: role._id, 
            type: ADMIN_TYPE, 
            companyId: company._id 
        });

        res.responseEntity({ data: result });
    }
}