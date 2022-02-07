import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env, setupSwagger } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule).then(app => setupSwagger(app));
  await app.listen(env.PORT).then(() => {
    Logger.log(`Nest application listening at ${env.HOST}:${env.PORT}`, 'NestApplication');
  });
}

bootstrap();
