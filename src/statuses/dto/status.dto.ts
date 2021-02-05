import { IsNotEmpty, IsNumberString } from 'class-validator';
import { StatusModel } from '../models/status.model';
import { ApiProperty } from '@nestjs/swagger';

export class AddStatusDTO {
    @ApiProperty({
        type: String, 
        description: 'Status title',
      })
    @IsNotEmpty()
    title: StatusModel['title'];

    @ApiProperty({
        type: Number, 
        description: 'Status position',
      })
    @IsNotEmpty()
    @IsNumberString()
    position: StatusModel['position'];
    
}

export class UpdateStatusDTO {
    @ApiProperty({
        type: String, 
        description: 'Status title',
      })
    title: StatusModel['title'];
    @ApiProperty({
        type: Number, 
        description: 'Status position',
      })
    position: StatusModel['position'];

}