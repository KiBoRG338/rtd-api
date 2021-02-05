import { Module, forwardRef } from '@nestjs/common';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusSchema } from './schemas/status.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }]),
    forwardRef(() => AuthModule),    
  ],
  controllers: [StatusesController],
  providers: [StatusesService],
  exports: [StatusesService]
})
export class StatusesModule {}
