import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserWithToken } from '../users/user.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
  ) {}

  private saltRounds = 10;

  async validateUser(username: string): Promise<boolean> {
    if (username) {
      // return Boolean(await this.userService.getUser(username));
    }
    return false;
  }

  async createToken(user: User): Promise<UserWithToken> {
    const token = this.jwtService.sign({
      sub: user.id,
      username: user.username,
      email: user.email,
    });

    return { user, token };
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return Boolean(bcrypt.compare(password, hash));
  }

  async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
