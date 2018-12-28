import { Resolver, FieldResolver, Root, Query, Arg, Int, Mutation, Ctx } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Chit } from '../entities/chit';
import { User } from '../entities/user';
import { ChitInput } from './types/chit-input';
import { Context } from '..';

@Resolver(of => Chit)
export class ChitResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Chit) private readonly chitRepository: Repository<Chit>,
  ) {}

  @FieldResolver()
  async author(@Root() chit: Chit): Promise<User> {
    return (await this.userRepository.findOne(chit.authorId, {
      cache: 1000,
    }))!;
  }

  @Query(returns => Chit, { nullable: true })
  chit(@Arg('chitId', type => Int) chitId: number) {
    return this.chitRepository.findOne(chitId);
  }

  @Query(returns => [Chit])
  chits(): Promise<Chit[]> {
    return this.chitRepository.find();
  }

  @Mutation(returns => Chit)
  async createChit(
    @Arg('chit') chitInput: ChitInput,
    @Ctx() { user }: Context,
  ): Promise<Chit> {
    const chit = this.chitRepository.create({
      ...chitInput,
      authorId: user.id,
    });
    return await this.chitRepository.save(chit);
  }
}
