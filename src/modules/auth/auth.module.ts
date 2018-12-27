import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../users/user.service';
import { GqlAuthGuard } from './gql.auth';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UserModule),
    JwtModule.register({
      secretOrPrivateKey: process.env.SECRET_KEY || 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [ AuthService, UserService, JwtStrategy, GqlAuthGuard ],
  exports: [ AuthService ],
})
export class AuthModule {}
