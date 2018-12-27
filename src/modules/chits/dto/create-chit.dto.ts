import { Length } from 'class-validator';

import { CreateChitInput } from '../../../graphql.schema';

export class CreateChitDto implements CreateChitInput {
  @Length(1, 100)
  content: string;

  author: number;
}
