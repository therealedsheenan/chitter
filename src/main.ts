import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // logger
  app.use(morgan('combined'));

  // body parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false,
  }));

  await app.listen(3000);
}
bootstrap();
