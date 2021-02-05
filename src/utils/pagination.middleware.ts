import { Request, Response } from 'express';
import { LIMIT } from "src/config";
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export type IPagination = { 
    skip?: number, 
    count?: number 
}

export class PaginationDTO {
    @ApiProperty({
      type: Number, 
      description: 'Page',
    })
    @IsNotEmpty()
    page: number;
  
    @ApiProperty({
      type: Number, 
      description: 'Count',
    })
    count: number;
  }

export function PaginationMiddleware(req: any, res: Request, next: Function){
    const qpage = +req.query.page;
    const qcount = +req.query.count;
    const skip = qpage * qcount || 0;
    const count = qcount || LIMIT;
    
    const pagination: IPagination = {skip, count};
    req.pagination = pagination;
    next();
}
