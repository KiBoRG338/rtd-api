import { IsNotEmpty } from 'class-validator';
import { TaskModel } from '../models/task.model';
import { ApiProperty } from '@nestjs/swagger';
import { StatusModel } from 'src/statuses/models/status.model';
import { UserModel } from 'src/users/models/user.model';

export class AddTaskDTO {
    @ApiProperty({
      type: String, 
      description: 'Project id',
    })
    @IsNotEmpty()
    projectId: TaskModel['projectId'];

    @ApiProperty({
      type: String, 
      description: 'Task title',
    })
    @IsNotEmpty()
    title: TaskModel['title'];

    @ApiProperty({
      type: String, 
      description: 'Task description',
    })
    description: TaskModel['description'];
}

export class UpdateTaskDTO {
    @ApiProperty({
        type: String, 
        description: 'Project title',
      })
    title: TaskModel['title'];
    @ApiProperty({
        type: String, 
        description: 'Project description',
      })
    description: TaskModel['description'];
}

export class UpdateTaskStatusDTO {
  @ApiProperty({
    type: String, 
    description: 'Task id',
  })
  @IsNotEmpty()
  taskId: TaskModel['_id'];

  @ApiProperty({
    type: String, 
    description: 'Status id',
  })
  @IsNotEmpty()
  statusId: StatusModel['_id'];

}

export class UpdateTaskExecutorDTO {
  @ApiProperty({
    type: String, 
    description: 'Task id',
  })
  @IsNotEmpty()
  taskId: TaskModel['_id'];
  @ApiProperty({
    type: String, 
    description: 'Executor id',
  })
  @IsNotEmpty()
  userId: UserModel['_id'];
}