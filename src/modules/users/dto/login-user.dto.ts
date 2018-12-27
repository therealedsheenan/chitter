import { IsEmail, Length } from 'class-validator';

import { LoginUserInput } from '../../../graphql.schema';

export class LoginUserDto implements LoginUserInput {
  @Length(4, 20)
  username: string;

  @Length(8, 64)
  password: string;
}
