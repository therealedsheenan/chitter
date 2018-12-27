import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
// import { join } from 'path';

import { UserModule } from './modules/users/user.module';
import { ChitModule } from './modules/chits/chit.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(), // database
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.schema.ts'),
      // },
    }),
    UserModule,
    ChitModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
