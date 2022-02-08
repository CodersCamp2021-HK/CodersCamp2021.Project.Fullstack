import 'reflect-metadata';
import { env } from './config';
import { Logger } from '@nestjs/common';
import { appFactory } from './app.factory';

async function bootstrap() {
  const app = await appFactory();
  await app.listen(env.PORT).then(() => {
    Logger.log(`Nest application listening at ${env.HOST}:${env.PORT}/api`, 'NestApplication');
  });
}

bootstrap();
