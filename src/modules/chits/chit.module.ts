import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chit } from './chit.entity';
import { ChitResolver } from './chit.resolver';
import { ChitService } from './chit.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Chit]) ],
  providers: [ ChitService, ChitResolver ],
})
export class ChitModule {}
