import { Field, ID, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@ObjectType()
@Entity()
export class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Field()
  @Length(4, 20)
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;
}
