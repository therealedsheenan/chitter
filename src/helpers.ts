import { getRepository, Column, ColumnOptions } from 'typeorm';

import { User } from './entities/user';

export async function seedDatabase() {
  const userRepository = getRepository(User);

  const defaultUser = userRepository.create({
    email: 'test@github.com',
    username: 'test1',
    password: 'password',
  });
  await userRepository.save(defaultUser);

  return {
    defaultUser,
  };
}

export function RelationColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}
