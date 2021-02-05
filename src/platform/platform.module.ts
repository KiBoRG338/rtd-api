import { Module, forwardRef } from '@nestjs/common';
import { PlatformController } from './platform.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { StatusesModule } from 'src/statuses/statuses.module';

@Module({
  imports: [    
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => RolesModule),
    forwardRef(() => StatusesModule),
  ],
  controllers: [PlatformController]
})
export class PlatformModule {}
