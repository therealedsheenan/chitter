import { Injectable, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Chit } from './chit.entity';
import { CreateChitDto } from './dto/create-chit.dto';

@Injectable()
export class ChitService {
  constructor(
    @InjectRepository(Chit) private readonly chitRepository: Repository<Chit>,
  ) {}

  async createChit(chit) {
    const newChit = new Chit();
    newChit.content = chit.content;
    newChit.author = chit.author;
    return await newChit.save();
  }

  async getChit(id: string): Promise<Chit> {
    if (id) {
      return await Chit.findOne(id, { relations: ['author'] });
    }
  }

  async getChits(): Promise<Chit[]> {
    return await Chit.find({ relations: ['author'] });
  }

  // async updateChit(chit: Chit) {
  //   const getChit = await Chit.findOne(chit.id);
  //   // update query below
  //   // getUser.update
  //   return await Chit.save(getChit);
  // }
  //
  // async deleteChit(chitId: number) {
  //   return await Chit.delete(chitId);
  // }
}
