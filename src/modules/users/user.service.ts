import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';

export interface UserWithToken {
  user: User;
  token: string;
}

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUser(username: string) {
    return await this.userRepository.findOne({
      username,
    }, {
      relations: ['chits'],
    });
  }

  async loginUser(user): Promise<UserWithToken|boolean> {
    const loginUser = await this.getUser(user.username);
    const testPass =  await this.authService.compareHash(user.password, loginUser.password)
    if (
      loginUser &&
      await this.authService.compareHash(user.password, loginUser.password)
    ) {
      return await this.authService.createToken(loginUser);
    }
    return false;
  }

  async createUser(user) {
    const newUser = new User();
    const assignData = (await this.assignVariables(newUser, user)) as User;
    assignData.password = await this.authService.getHash(assignData.password);
    return await assignData
      .save()
      .then((assignedUser: User) =>
        this.authService.createToken(assignedUser));
  }

  async updateUser(user: User) {
    const getUser = this.userRepository.findOne(user.id);
    // Updates
    const assignData = (await this.assignVariables(getUser, user)) as User;
    return await User.save(assignData);
  }

  async findUserByToken(token: string) {
    // decode token here
    // return await User.find
    return false;
  }

  // assigning values to consumer based from the provider's object property
  private async assignVariables(consumer: object, provider: object) {
    Object.keys(provider).map((value: string) => {
      consumer[value] = provider[value];
    });
    return consumer;
  }
}
