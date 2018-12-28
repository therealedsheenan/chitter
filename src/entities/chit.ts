import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Length } from 'class-validator';
import { RelationColumn } from '../helpers';
import { User } from './user';

@Entity()
@ObjectType()
export class Chit {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  @Length(1, 100)
  content: string;

  @CreateDateColumn()

  @UpdateDateColumn()

  @Field(type => User)
  @ManyToOne(type => User)
  author: User;
  @RelationColumn()
  authorId: number;
}
