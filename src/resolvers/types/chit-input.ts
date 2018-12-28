import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class ChitInput {
  @Field()
  content: string;

  @Field(type => Int)
  authorId: number;
}
