import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from '../users/user.entity';

@Entity()
export class Chit extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 100)
  content: string;

  @CreateDateColumn()

  @UpdateDateColumn()

  @ManyToOne(type => User, author => author.chits)
  author: User;
}
