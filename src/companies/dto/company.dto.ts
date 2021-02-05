
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Company } from '../models/company.model';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/users/models/user.model';


export class CreateCompanyDTO {
  @ApiProperty({
      type: String, 
      description: 'User id',
    })
  @IsNotEmpty()
  userId: UserModel['_id'];

  @ApiProperty({
      type: String, 
      description: 'Role id',
    })
  @IsNotEmpty()
  roleId: Company['roleId'];

  @ApiProperty({
      type: String, 
      description: 'User id',
    })
  @IsNotEmpty()
  type: Company['type'];

  @ApiProperty({
      type: String, 
      description: 'Email',
    })
  @IsNotEmpty()
  @IsEmail()
  email: Company['email'];
    
  @ApiProperty({
      type: String, 
      description: 'Name',
    })
    @IsNotEmpty() 
    name: Company['name'];

    @ApiProperty({
      type: String, 
      description: 'Website',
    })
   @IsNotEmpty() 
    website: Company['website'];
}