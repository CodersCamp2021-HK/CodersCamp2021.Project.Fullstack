import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env, setupSwagger } from './config';

function appFactory() {
  return NestFactory.create(AppModule, {
    cors: env.NODE_ENV === 'development',
    logger:
      env.NODE_ENV === 'development'
        ? ['verbose', 'debug', 'log', 'warn', 'error']
        : ['log', 'warn', 'error'],
  }).then((app) => setupSwagger(app));
}

export { appFactory };