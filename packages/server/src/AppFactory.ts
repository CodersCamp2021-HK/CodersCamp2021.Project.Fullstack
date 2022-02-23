import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { AppModule } from './AppModule';
import { env, setupSwagger } from './config';

async function appFactory(options: NestApplicationOptions = {}) {
  const app = await NestFactory.create(AppModule, {
    cors: env.NODE_ENV !== 'production',
    logger: env.NODE_ENV !== 'production' ? ['verbose', 'debug', 'log', 'warn', 'error'] : ['log', 'warn', 'error'],
    ...options,
  });
  app.use(cookieParser());
  return setupSwagger(app);
}

export { appFactory };
