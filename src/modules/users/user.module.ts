import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  providers: [ UserService, UserResolver, AuthService ],
  exports: [ UserService ],
})
export class UserModule {}
