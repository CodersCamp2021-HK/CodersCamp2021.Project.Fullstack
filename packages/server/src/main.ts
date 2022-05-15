import 'reflect-metadata';

import { Logger } from '@nestjs/common';
import compression from 'compression';

import { appFactory } from './AppFactory';
import { env } from './config';

async function bootstrap() {
  const app = await appFactory();
  app.use(compression());
  await app.listen(env.PORT).then(() => {
    Logger.log(`Nest application listening at ${env.SERVER_URL}/api`, 'NestApplication');
  });
}

bootstrap();
