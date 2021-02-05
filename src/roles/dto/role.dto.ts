import { IsNotEmpty } from 'class-validator';
import { Role } from '../models/role.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
    @ApiProperty({
        type: String, 
        description: 'Role title',
      })
    @IsNotEmpty()
    title: Role['title'];

    @ApiProperty({
        type: String, 
        description: 'Company id',
      })
    @IsNotEmpty()
    companyId: Role['companyId'];
    
}

export class UpdateRoleDTO {
    @ApiProperty({
        type: String, 
        description: 'Role title',
      })
    @IsNotEmpty()
    title: Role['title'];

}