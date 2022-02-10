import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './AppModule';
import { env, setupSwagger } from './config';

function appFactory(options: NestApplicationOptions = {}) {
  return NestFactory.create(AppModule, {
    cors: env.NODE_ENV === 'development',
    logger: env.NODE_ENV === 'development' ? ['verbose', 'debug', 'log', 'warn', 'error'] : ['log', 'warn', 'error'],
    ...options,
  }).then((app) => setupSwagger(app));
}

export { appFactory };
