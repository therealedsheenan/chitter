import { InputType, Field, Int, ID } from 'type-graphql';

@InputType()
export class ChitInput {
  @Field()
  content: string;

  @Field(type => Int)
  authorId: number;
}

@InputType()
export class ChitDeleteInput {
  @Field()
  chitId: number;
}

@InputType()
export class ChitUpdateInput {
  @Field()
  id: number;

  @Field()
  content: string;
}
