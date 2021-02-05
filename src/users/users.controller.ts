import { 
    Controller, Get, Res, Inject, forwardRef,
    NotFoundException, Post, Body, UseGuards, Put, Req, Query, ForbiddenException
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

import { AuthDTO, AddMemberDTO, signupMemberDTO, CreateAdminDTO } from './dto/user.dto';

import { AuthGuard } from '../auth/auth.guards';
import { ADMIN_TYPE, MEMBER_TYPE, ENABLED_STATUS, PM_ROLE } from '../utils/enum.constants';
import { ApiSecurity, ApiOkResponse, ApiUnauthorizedResponse, ApiNotFoundResponse, ApiForbiddenResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CustomRequest, CustomResponse } from 'src/utils/global.model';
import { PaginationDTO } from 'src/utils/pagination.middleware';
import { CompaniesService } from 'src/companies/companies.service';

@ApiSecurity('Basic')
@Controller('api/v1/users')
export class UsersController {

    constructor(
        private UsersService: UsersService, 
        @Inject(forwardRef(() => AuthService)) private AuthService: AuthService,
        @Inject(forwardRef(() => CompaniesService)) private CompanyService: CompaniesService
        ) { }

    @Get('')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })    
    @ApiOkResponse({ description: 'List of users successfully received.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async getUsers(@Res() res: CustomResponse, @Req() req: CustomRequest, @Query() query: PaginationDTO) {
        const users = await this.UsersService.findAllPagination({
            skip: req.pagination.skip, 
            count: req.pagination.count,
            query: {}
        });
        res.responseList({ data: users, pagination: {page: +query.page, count: req.pagination.count} });
    }   

    @Get('/me')
    @UseGuards(AuthGuard([]))
    @ApiOperation({ summary: '' })    
    @ApiOkResponse({ description: 'Get information about me' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    async getMe(@Req() req: CustomRequest, @Res() res: CustomResponse) {
        const user = await this.UsersService.findOne({ _id: req.user.userId });
        res.responseEntity({ data: user });
    }   

    @Post('/auth')
    @ApiOperation({ summary: '[ ]' })    
    @ApiOkResponse({ description: 'Authorized.'})
    @ApiNotFoundResponse({ description: 'Login or password is wrong.'})
    async auth(@Res() res: CustomResponse, @Body() data: AuthDTO) {    
        const user = await this.UsersService.getByCredentials(data);
        if(!user) {
            throw new NotFoundException({
                statusCode: 404,
                error: "Login or password is wrong."
            });
        }

        const result = await this.AuthService.createToken({ 
            userId: user._id,
            roleId: user.roleId,
            type: user.type, 
            companyId: user.companyId 
        });
        res.responseEntity({ data: result });
    }

    @Post('/admin')
    @ApiOperation({ summary: '[ ]' })    
    @ApiOkResponse({ description: 'Signed up.'})
    @ApiNotFoundResponse({ description: 'A user with this email or username is already registered.'})
    async createAdmin(@Res() res: CustomResponse, @Body() data: CreateAdminDTO) {    
        const email = await this.UsersService.findOne({email: data.email});
        const username = await this.UsersService.findOne({username: data.username});
        if(email) {
            throw new NotFoundException({
                statusCode: 404,
                error: "A user with this email is already registered."
            });
        }
        if(username) {
            throw new NotFoundException({
                statusCode: 404,
                error: "A user with this username is already registered."
            });
        }

        const user = await this.UsersService.createAdmin({ 
            email: data.email,
            username: data.username, 
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            type: ADMIN_TYPE,
            roleId: null,
            status: ENABLED_STATUS
         });
        res.responseEntity({ data: user });
    }


    @Post('/members')
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    @ApiOperation({ summary: ADMIN_TYPE })    
    @ApiCreatedResponse({ description: 'User is created.'})
    @ApiUnauthorizedResponse({ description: 'Unauthorized.'})
    @ApiForbiddenResponse({ description: 'A user with this email is already registered.'})
    @UseGuards(AuthGuard([ADMIN_TYPE]))
    async addMember(@Req() req, @Res() res: CustomResponse, @Body() data: AddMemberDTO) {
        const email = await this.UsersService.findOne({email: data.email});
        if(email){
            throw new NotFoundException({
                statusCode: 404,
                error: "A user with this email is already registered."
            });
        }
        const addedMember = await this.UsersService.addMember({
          email: data.email,
          roleId: data.roleId,
          companyId: req.user.companyId,
          type: MEMBER_TYPE
        });

        await this.CompanyService.addMember({companyId: addedMember.companyId, userId: addedMember._id});

        res.responseEntity({ data: addedMember });
        
    }
    
    @Put('/members/signup')
    @ApiOperation({ summary: ADMIN_TYPE })    
    @ApiCreatedResponse({ description: 'User is updated.'})
    @ApiNotFoundResponse({ description: 'User id is wrong.'})
    async signupMember(@Res() res: CustomResponse, @Body() data: signupMemberDTO) {
        const user = await this.UsersService.findOne({ _id: data.userId, status: null})
        if(!user){
            throw new ForbiddenException();
        }
        await this.UsersService.signupMember(data.userId, {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            status: ENABLED_STATUS
        });

        const result = await this.AuthService.createToken({ 
            userId: user._id, 
            roleId: user.roleId, 
            type: MEMBER_TYPE, 
            companyId: user.companyId
        });

        res.responseEntity({ data: result });
        
    }
}