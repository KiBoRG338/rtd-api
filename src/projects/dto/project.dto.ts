
import { IsNotEmpty } from 'class-validator';
import { ProjectModel } from '../models/project.model';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from 'src/users/models/user.model';

export class CreateProjectDTO {
    @ApiProperty({
        type: String, 
        description: 'Project name',
      })
    @IsNotEmpty()
    name: ProjectModel['name'];
    @ApiProperty({
      type: String, 
      description: 'Project description',
    })
    description: ProjectModel['description'];
}

export class UpdateProjectDTO {
    @ApiProperty({
        type: String, 
        description: 'Project name',
      })
    @IsNotEmpty()
    name: ProjectModel['name'];

    @ApiProperty({
      type: String, 
      description: 'Project description',
    })
    description: ProjectModel['description'];
    @ApiProperty({
        type: Array, 
        description: 'Project member ids',
      })
    memberIds: ProjectModel['memberIds']
}

export class ManageMemberDTO {
  @ApiProperty({
    type: String, 
    description: 'Project id',
  })
  @IsNotEmpty()
  projectId: ProjectModel['_id'];

  @ApiProperty({
    type: String, 
    description: 'Project description',
  })
  @IsNotEmpty()
  userId: UserModel['_id'];
}