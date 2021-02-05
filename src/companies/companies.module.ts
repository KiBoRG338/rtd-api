import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompanySchema } from './schemas/company.schema';
import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/roles.module';
import { StatusesModule } from '../statuses/statuses.module';
import { UsersModule } from '../users/users.module';



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    forwardRef(() => AuthModule),
    forwardRef(() => StatusesModule),
    forwardRef(() => RolesModule),
    forwardRef(() => UsersModule),
  ],
  providers: [CompaniesService],
  controllers: [CompaniesController],
  exports: [CompaniesService]

})
export class CompaniesModule {}
