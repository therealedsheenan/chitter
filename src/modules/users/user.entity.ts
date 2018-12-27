import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { Length, IsDate, IsEmail } from 'class-validator';

import { Chit } from '../chits/chit.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Length(4, 20)
  @Column()
  username: string;

  @Length(8, 64)
  @Column()
  password: string;

  @CreateDateColumn()

  @UpdateDateColumn()

  @OneToMany(type => Chit, chit => chit.author)
  chits: Chit[];

  // @IsDate()
  // createDate: Date;
}
