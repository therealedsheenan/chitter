import { IsEmail, Length } from 'class-validator';

import { CreateUserInput } from '../../../graphql.schema';

export class CreateUserDto implements CreateUserInput {
  @IsEmail()
  @Length(4, 50)
  email: string;

  @Length(4, 20)
  username: string;

  @Length(8, 64)
  password: string;
}
