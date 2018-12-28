import { Resolver, FieldResolver, Root, Query, Arg, Int, Mutation, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Chit } from '../entities/chit';
import { User } from '../entities/user';
import { UserInput } from './types/user-input';

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
    return await this.userRepository.save(user);
  }
}
