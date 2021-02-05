import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { RolesModule } from './roles/roles.module';
import { StatusesModule } from './statuses/statuses.module';
import { PaginationMiddleware } from './utils/pagination.middleware';
import { PlatformModule } from './platform/platform.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://adminAgent007:bi2bababobo@ds231956.mlab.com:31956/heroku_tcdkxt1d', { useNewUrlParser: true }),
    UsersModule,
    CompaniesModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
    RolesModule,
    StatusesModule,
    PlatformModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({path: '*', method: RequestMethod.GET})
  }
}
