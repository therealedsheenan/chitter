import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ChitService } from './chit.service';
import { ValidationPipe } from '../../validation.pipe';
import { Chit } from './chit.entity';
import { CreateChitDto } from './dto/create-chit.dto';
import { GqlAuthGuard } from '../auth/gql.auth';

@Resolver('Chit')
export class ChitResolver {
  constructor(private readonly chitService: ChitService) {}

  @Query('getChit')
  public async getChit(@Args('id') id: string): Promise<Chit> {
    const chit = await this.chitService.getChit(id);
    return chit;
  }

  @Query()
  public async getChits(): Promise<Chit[]> {
    const chits = await this.chitService.getChits();
    return chits;
  }

  // @Query()
  // public async deleteChit(@Args('getChit') args: GetChit) {
  //   const { chitId } = params;
  //   const delteChit = await this.chitService.deleteChit(chitId);
  //   res.status(HttpStatus.OK).json(delteChit);
  // }

  // @UsePipes(new ValidationPipe())
  @UseGuards(new GqlAuthGuard())
  @Mutation('createChit')
  public async createChit(
    @Args('createChitInput') args: CreateChitDto,
  ): Promise<Chit> {
    const newChit = await this.chitService.createChit(args);
    return newChit;
  }
}
