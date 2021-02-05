import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TasksController } from './tasks.controller';
import { ProjectsModule } from 'src/projects/projects.module';
import { StatusesModule } from 'src/statuses/statuses.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => ProjectsModule),
    forwardRef(() => StatusesModule),
    forwardRef(() => UsersModule),
  ],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
