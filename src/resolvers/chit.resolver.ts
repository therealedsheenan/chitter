import { Resolver, FieldResolver, Root, Query, Arg, Int, Mutation, Ctx, Authorized } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Chit } from '../entities/chit';
import { User } from '../entities/user';
import { ChitInput, ChitDeleteInput, ChitUpdateInput } from './types/chit-input';

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

  @Authorized()
  @Mutation(returns => Chit)
  async createChit(
    @Arg('chit') chitInput: ChitInput,
    @Ctx() { user },
  ): Promise<Chit> {
    const chit = this.chitRepository.create({
      ...chitInput,
      authorId: user.id,
    });
    return await this.chitRepository.save(chit);
  }

  @Mutation(returns => Chit)
  async deleteChit(
    @Arg('chit') chitDeleteInput: ChitDeleteInput,
    ): Promise<any> {
    const findChit = await this.chitRepository.findOne(chitDeleteInput.chitId);
    return await this.chitRepository.remove(findChit);
  }

  @Mutation(returns => Chit)
  async updateChit(
    @Arg('chit') chitUpdateInput: ChitUpdateInput,
  ): Promise<Chit> {
    await this.chitRepository.update(
      chitUpdateInput.id, {
        ...chitUpdateInput,
      },
    );
    return await this.chitRepository.findOne(chitUpdateInput.id);
  }
}
