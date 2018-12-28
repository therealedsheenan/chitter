import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';

import { ChitResolver } from './resolvers/chit.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { User } from './entities/user';
import { Chit } from './entities/chit';
import { seedDatabase } from './helpers';

export interface Context {
  user: User;
}

// register 3rd party IOC container
TypeGraphQL.useContainer(Container);
TypeORM.useContainer(Container);

async function bootstrap() {
  try {
    // create TypeORM connection
    await TypeORM.createConnection({
      type: 'mysql',
      database: 'chitter',
      username: 'root', // fill this with your username
      password: 'root', // and password
      port: 3306,
      host: '127.0.0.1',
      entities: [User, Chit], // ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      dropSchema: true,
      cache: true,
    });

    // seed database with some data
    const { defaultUser } = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [ChitResolver, UserResolver],
    });

    // create mocked context
    const context: Context = { user: defaultUser };

    // Create GraphQL server
    const server = new ApolloServer({ schema, context });

    // Start the server
    const { url } = await server.listen(4000);
    // tslint:disable-next-line
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  } catch (err) {
    // tslint:disable-next-line
    console.error(err);
  }
}

bootstrap();
