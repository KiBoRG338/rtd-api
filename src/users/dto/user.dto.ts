import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserModel } from '../models/user.model';
import { ApiProperty } from '@nestjs/swagger';


export class AuthDTO {
    @ApiProperty({
        type: String, 
        description: 'Email',
      })
    @IsNotEmpty()
    @IsEmail()
    email: UserModel['email'];
    
    @ApiProperty({
        type: String, 
        description: 'Password',
      })
    @IsNotEmpty() 
    password: UserModel['password'];
};

export class CreateAdminDTO {
  @ApiProperty({
      type: String, 
      description: 'Email',
    })
  @IsNotEmpty()
  @IsEmail()
  email: UserModel['email'];

  @ApiProperty({
    type: String, 
    description: 'Username',
  })
  @IsNotEmpty() 
  username: UserModel['username'];

  @ApiProperty({
    type: String, 
    description: 'First name',
  })
  @IsNotEmpty() 
  firstName: UserModel['firstName'];

  @ApiProperty({
    type: String, 
    description: 'Last name',
  })
  @IsNotEmpty() 
  lastName: UserModel['lastName'];
  
  @ApiProperty({
      type: String, 
      description: 'Password',
    })
  @IsNotEmpty() 
  password: UserModel['password'];
};


export class AddMemberDTO {
    @ApiProperty({
        type: String, 
        description: 'Email',
      })
    @IsNotEmpty()
    @IsEmail()
    email: UserModel['email'];

    @ApiProperty({
        type: String, 
        description: 'Role id',
      })
    @IsNotEmpty()
    roleId: UserModel['roleId'];
}

export class signupMemberDTO {
    @ApiProperty({
        type: String, 
        description: 'User id',
      })
    @IsNotEmpty()
    userId: UserModel['_id'];

    @ApiProperty({
        type: String, 
        description: 'Username',
      })
    @IsNotEmpty()
    username: UserModel['username'];

    @ApiProperty({
        type: String, 
        description: 'First name',
      })
    @IsNotEmpty()
    firstName: UserModel['firstName'];

    @ApiProperty({
        type: String, 
        description: 'Last name',
      })
    @IsNotEmpty()
    lastName: UserModel['lastName'];

    @ApiProperty({
        type: String, 
        description: 'Password',
      })
    @IsNotEmpty()
    password: UserModel['password'];

    }