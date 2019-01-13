import {
  Resolver,
  FieldResolver,
  Root,
  Query,
  Arg,
  Int,
  Mutation,
  Ctx,
} from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import * as jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { Chit } from '../entities/chit';
import { User } from '../entities/user';
import { UserInput, UserLoginInput } from './types/user-input';

@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Chit) private readonly chitRepository: Repository<Chit>,
  ) {}

  @Query(returns => User, { nullable: true })
  user(@Arg('userId', type => Int) userId: number) {
    return this.userRepository.findOne(userId);
  }

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Mutation(returns => User)
  async createUser(@Arg('user') userInput: UserInput): Promise<User> {
    const user = this.userRepository.create({ ...userInput });
    // await this.userRepository.save(user);

    return jsonwebtoken.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || 'topsecret',
      {
        expiresIn: '1y',
      },
    );
  }

  @Mutation(returns => User)
  async loginUser(@Arg('user') loginInput: UserLoginInput): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: loginInput.username },
    });
    if (!user) {
      throw new Error('No User with that username.');
    }

    const valid = await bcrypt.compare(loginInput.password, user.password);

    if (!valid) {
      throw new Error('Incorrect password.');
    }

    return jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'topsecret',
      { expiresIn: '1d' },
    );
  }
}
