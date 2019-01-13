import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server-express';
import * as express from 'express';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import * as jwt from 'express-jwt';

import { ChitResolver } from './resolvers/chit.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { User } from './entities/user';
import { Chit } from './entities/chit';
import { authChecker } from './services/auth';
// import { seedDatabase } from './helpers';

const app = express();
const path = '/graphql';

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
    // const { defaultUser } = await seedDatabase();

    // build TypeGraphQL executable schema
    const schema = await TypeGraphQL.buildSchema({
      resolvers: [ChitResolver, UserResolver],
      authChecker,
    });

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      context: ({ req }) => {
        return {
          req,
          user: req.user,
        };
      },
    });

    // Mount a jwt or other authentication middleware that is run before the GraphQL execution
    app.use(
      path,
      jwt({
        secret: 'topsecret',
        credentialsRequired: false,
      }),
    );

    server.applyMiddleware({ app, path });

    // Start the server
    app.listen({ port: 4000 }, () => {
      // tslint:disable-next-line
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
      );
    });
  } catch (err) {
    // tslint:disable-next-line
    console.error(err);
  }
}

bootstrap();
